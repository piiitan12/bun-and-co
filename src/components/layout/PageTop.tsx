"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./PageTop.module.scss";

/** ページ先頭へ戻るボタン。元テーマと同じく、ロゴのマークと光る「PAGE TOP」を黒い札に載せる（生成りの地でも文字が読めるよう、文字も札の中に入れた）。
 *  150px スクロールしたら下からせり上がる（元は jQuery の animate で bottom を -100px → 20px） */
export default function PageTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 150);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      className={`${styles.btn} ${show ? styles.isShow : ""}`}
      aria-label="ページの先頭へ戻る"
      tabIndex={show ? 0 : -1}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <span className={styles.badge}>
        <Image src="/images/logo/logo-mark.svg" alt="" width={916} height={628} className={styles.mark} />
        <span className={styles.label} aria-hidden="true">
          PAGE TOP
        </span>
      </span>
    </button>
  );
}
