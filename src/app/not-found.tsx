import type { Metadata } from "next";
import Link from "next/link";
import nav from "@/data/nav.json";
import styles from "./not-found.module.scss";

export const metadata: Metadata = {
  title: "ページが見つかりません",
  robots: { index: false, follow: false },
};

// 迷った人の次の行き先。TOP はボタンで出すので、ここからは外す
const links = nav.global.filter((item) => item.href !== "/");

/** 404。元テーマの 404.php は「404」と出すだけだったので、戻り先を示すページにした */
export default function NotFound() {
  return (
    <section className={`section ${styles.notFound}`}>
      <div className={`inner ${styles.inner}`}>
        <p className={styles.code} aria-hidden="true">
          404
        </p>
        <p className={styles.en}>PAGE NOT FOUND</p>
        <h1 className={styles.title}>ページが見つかりません</h1>
        <p className={styles.text}>
          お探しのページは、移動または削除された可能性があります。
          <br />
          URL をお確かめいただくか、下のリンクからお進みください。
        </p>
        <p className={styles.back}>
          <Link href="/" className={styles.backLink}>
            BACK TO TOP
          </Link>
        </p>
        <ul className={styles.links}>
          {links.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className={styles.link}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
