"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./BgmToggle.module.scss";

/** BGM の再生／停止。元テーマの <audio loop> ＋ jQuery の切替を useState で再実装。
 *  音源は元サイトと同じもの（使用可の確認済み）。差し替えは src だけ */
export default function BgmToggle({ src = "/audio/bgm.mp3" }: { src?: string }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.play().catch(() => setPlaying(false)); // 自動再生が止められた場合は表示を戻す
    } else {
      audio.pause();
    }
  }, [playing]);

  return (
    <div className={styles.wrap}>
      <audio ref={audioRef} src={src} loop preload="none" />
      <button
        type="button"
        className={`${styles.btn} ${playing ? styles.isPlaying : ""}`}
        aria-pressed={playing}
        onClick={() => setPlaying((v) => !v)}
      >
        <span className={styles.bars} aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
        {playing ? "MUSIC OFF" : "MUSIC ON"}
      </button>
    </div>
  );
}
