"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import nav from "@/data/nav.json";
import type { NavItem } from "@/types/data";
import Logo from "@/components/common/Logo";
import DrawerNav from "./DrawerNav";
import styles from "./Header.module.scss";

const globalNav = nav.global as NavItem[];
const externalNav = nav.external as NavItem[];

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname(); // 現在地の表示（aria-current）に使う。ドロワーはリンクの onClick で閉じる

  // ドロワーを開いている間は背景をスクロールさせない
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className={styles.header}>
      <div className={styles.bar}>
        <Logo />
        <nav className={styles.nav} aria-label="メインナビゲーション">
          <ul className={styles.list}>
            {globalNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={styles.link} aria-current={pathname === item.href ? "page" : undefined}>
                  {item.label}
                </Link>
              </li>
            ))}
            {externalNav.map((item) => (
              <li key={item.label}>
                <a href={item.href} className={`${styles.link} ${styles.external}`} aria-label={`${item.label}（外部サイト・ダミーリンク）`}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <button
          type="button"
          className={`${styles.hamburger} ${open ? styles.isOpen : ""}`}
          aria-expanded={open}
          aria-controls="drawer-nav"
          aria-label={open ? "メニューを閉じる" : "メニューを開く"}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
      <DrawerNav id="drawer-nav" open={open} items={[...globalNav, ...externalNav]} onClose={() => setOpen(false)} />
    </header>
  );
}
