// スクリーンショットを撮る（SP 375px＝モバイル端末エミュレーション／PC 1440px）。
// Chrome を DevTools プロトコルで操作する。追加パッケージ不要（Node 22 以上の標準 WebSocket を使う）。
// 使い方: npm run build && node scripts/screenshot.mjs [パス=/] [名前=top]
//   → docs/screenshots/<名前>_375.png と <名前>_1440.png
import { spawn, execSync } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import { setTimeout as sleep } from "node:timers/promises";

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const PORT = 3123;
const DEBUG_PORT = 9333;
const path = process.argv[2] ?? "/";
const name = process.argv[3] ?? "top";
const outDir = new URL("../docs/screenshots/", import.meta.url).pathname;
mkdirSync(outDir, { recursive: true });

const server = spawn("npx", ["next", "start", "-p", String(PORT)], { stdio: "ignore" });
const chrome = spawn(
  CHROME,
  [`--headless=new`, `--remote-debugging-port=${DEBUG_PORT}`, "--hide-scrollbars", "--window-size=1440,900", "about:blank"],
  { stdio: "ignore" },
);

async function cdp() {
  for (let i = 0; i < 30; i++) {
    try {
      const list = await (await fetch(`http://localhost:${DEBUG_PORT}/json`)).json();
      const page = list.find((t) => t.type === "page");
      if (page) return page.webSocketDebuggerUrl;
    } catch {}
    await sleep(300);
  }
  throw new Error("Chrome に接続できない");
}

async function waitServer() {
  for (let i = 0; i < 40; i++) {
    try {
      if ((await fetch(`http://localhost:${PORT}${path}`)).ok) return;
    } catch {}
    await sleep(300);
  }
  throw new Error("next start が起動しない");
}

function connect(url) {
  const ws = new WebSocket(url);
  let id = 0;
  const pending = new Map();
  const events = [];
  ws.addEventListener("message", (ev) => {
    const msg = JSON.parse(ev.data);
    if (msg.id && pending.has(msg.id)) {
      const { resolve, reject } = pending.get(msg.id);
      pending.delete(msg.id);
      if (msg.error) reject(new Error(msg.error.message));
      else resolve(msg.result);
    } else if (msg.method) events.push(msg.method);
  });
  const send = (method, params = {}) =>
    new Promise((resolve, reject) => {
      const myId = ++id;
      pending.set(myId, { resolve, reject });
      ws.send(JSON.stringify({ id: myId, method, params }));
    });
  return new Promise((resolve) => ws.addEventListener("open", () => resolve({ send, events, ws })));
}

async function shot(send, width, mobile, file) {
  await send("Emulation.setDeviceMetricsOverride", { width, height: 900, deviceScaleFactor: 1, mobile });
  await send("Page.navigate", { url: `http://localhost:${PORT}${path}` });
  await sleep(2500); // フォント・画像・ハイドレーションを待つ
  // 全体をスクロールして IntersectionObserver を発火させ、スクロール出現（FadeIn）の
  // 遷移（0.7s＋遅延）が終わるまで待ってから先頭へ戻す。念のため表示状態も直接そろえる
  await send("Runtime.evaluate", {
    expression: `(async()=>{
      const h=document.documentElement.scrollHeight;
      for(let y=0;y<h;y+=500){window.scrollTo(0,y);await new Promise(r=>setTimeout(r,120));}
      await new Promise(r=>setTimeout(r,1800));
      document.querySelectorAll('[class*="FadeIn_fade"]').forEach(el=>{el.style.transition='none';el.style.opacity='1';el.style.transform='none';});
      window.scrollTo(0,0);
      await new Promise(r=>setTimeout(r,1200));
    })()`,
    awaitPromise: true,
  });
  const { contentSize } = await send("Page.getLayoutMetrics");
  const height = Math.ceil(contentSize.height);
  await send("Emulation.setDeviceMetricsOverride", { width, height, deviceScaleFactor: 1, mobile });
  await sleep(400);
  const { data } = await send("Page.captureScreenshot", { format: "png", captureBeyondViewport: true, clip: { x: 0, y: 0, width, height, scale: 1 } });
  writeFileSync(file, Buffer.from(data, "base64"));
  const sw = await send("Runtime.evaluate", { expression: "document.documentElement.scrollWidth" });
  console.log(`saved ${file} (${width}×${height}, scrollWidth=${sw.result.value})`);
}

try {
  await waitServer();
  const { send, ws } = await connect(await cdp());
  await send("Page.enable");
  await shot(send, 375, true, `${outDir}${name}_375.png`);
  await shot(send, 1440, false, `${outDir}${name}_1440.png`);
  ws.close();
} finally {
  chrome.kill();
  server.kill();
  try {
    execSync(`pkill -f "next start -p ${PORT}"`);
  } catch {}
}
