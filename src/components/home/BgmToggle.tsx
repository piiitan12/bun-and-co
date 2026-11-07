"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "./BgmToggle.module.scss";

/** BGM の再生／停止。トップページだけ、左下に固定で置く（元テーマの #bgm-controller）。
 *  再生中は鼓動のように拡大・縮小をくり返す（元の @keyframes pulse）。音源の差し替えは src だけ */
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
    <>
      <audio ref={audioRef} src={src} loop preload="none" />
      <button
        type="button"
        className={`${styles.btn} ${playing ? styles.isPlaying : ""}`}
        aria-pressed={playing}
        aria-label={playing ? "BGM を止める" : "BGM を再生する"}
        onClick={() => setPlaying((v) => !v)}
      >
        <span className={styles.badge}>
          <Image src="/images/logo/music-mark.png" alt="" width={400} height={257} className={styles.mark} />
          <span className={styles.label} aria-hidden="true">
            {playing ? "MUSIC OFF" : "MUSIC ON"}
          </span>
        </span>
      </button>
    </>
  );
}
