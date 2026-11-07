import Link from "next/link";
import store from "@/data/store.json";
import styles from "./Logo.module.scss";

type Props = { variant?: "dark" | "light"; className?: string };

/** 文字ロゴ（仮置き）。本人がロゴを用意したら public/images/logo/ の SVG に差し替える */
export default function Logo({ variant = "dark", className = "" }: Props) {
  return (
    <Link href="/" className={`${styles.logo} ${styles[variant]} ${className}`} aria-label={`${store.name} トップページへ`}>
      <span className={styles.mark} aria-hidden="true">
        B
      </span>
      <span className={styles.text}>{store.name}</span>
    </Link>
  );
}
