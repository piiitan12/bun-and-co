"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import nav from "@/data/nav.json";
import type { NavItem } from "@/types/data";
import Image from "next/image";
import Logo from "@/components/common/Logo";
import Icon from "@/components/common/Icon";
import DrawerNav from "./DrawerNav";
import styles from "./Header.module.scss";

const globalNav = nav.global as NavItem[];
const externalNav = nav.external as NavItem[];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname(); // 現在地の表示（aria-current）に使う。ドロワーはリンクの onClick で閉じる

  // ドロワーを開いている間は背景をスクロールさせない
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // 200px スクロールしたら、ロゴを店名の文字に切り替え、ヘッダーを半透明にする（元 script.js の threshold = 200）
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 200);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`${styles.header} ${scrolled ? styles.isScrolled : ""}`}>
      <div className={styles.bar}>
        <Logo swapped={scrolled} />
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
              <li key={item.label} className={styles.externalItem}>
                <a href={item.href} className={`${styles.iconLink} ${item.icon === "uber" ? styles.delivery : ""}`} aria-label={`${item.label}（外部サイト・ダミーリンク）`}>
                  {item.icon === "uber" ? (
                    <>
                      <Image src="/images/icons/delivery.svg" alt="" width={110} height={110} className={styles.deliveryImg} />
                      <span className={styles.hoverText} aria-hidden="true">
                        {item.label}
                      </span>
                    </>
                  ) : (
                    <Icon name="instagram" size={30} />
                  )}
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
