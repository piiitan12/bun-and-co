"use client";

import { useEffect, useState } from "react";
import styles from "./PageTop.module.scss";

/** ページ先頭へ戻るボタン。一定量スクロールしたら表示 */
export default function PageTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      className={`${styles.btn} ${show ? styles.isShow : ""}`}
      aria-label="ページの先頭へ戻る"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <span aria-hidden="true">↑</span>
      <span className={styles.label}>PAGE TOP</span>
    </button>
  );
}
