"use client";

import { useEffect, useRef, type ReactNode } from "react";
import styles from "./FadeIn.module.scss";

type Props = { children: ReactNode; className?: string; delay?: number };

/** スクロールで画面に入ったら下からふわっと表示する。元テーマの fade（jQuery）を IntersectionObserver で置き換え */
export default function FadeIn({ children, className = "", delay = 0 }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // すでに画面内にあるものは観測を待たずに表示する
    if (!("IntersectionObserver" in window) || el.getBoundingClientRect().top < window.innerHeight) {
      el.classList.add(styles.isShow);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.isShow);
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={`${styles.fade} ${className}`} style={delay ? ({ "--fade-delay": `${delay}ms` } as React.CSSProperties) : undefined}>
      {children}
    </div>
  );
}
