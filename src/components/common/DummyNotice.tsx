"use client";

import { useEffect, useState } from "react";
import { DUMMY_LINK_EVENT } from "./ExternalLink";
import styles from "./DummyNotice.module.scss";

/** ダミーのリンクを押したときに、画面の下に 2.5 秒だけ出す案内。読み上げにも伝わるよう aria-live にする */
export default function DummyNotice() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    const show = () => {
      setVisible(true);
      clearTimeout(timer);
      timer = setTimeout(() => setVisible(false), 2500);
    };
    window.addEventListener(DUMMY_LINK_EVENT, show);
    return () => {
      window.removeEventListener(DUMMY_LINK_EVENT, show);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className={`${styles.notice} ${visible ? styles.isVisible : ""}`} role="status" aria-live="polite">
      {visible && "架空の店のため、リンク先はありません"}
    </div>
  );
}
