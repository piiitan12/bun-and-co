import Link from "next/link";
import Image from "next/image";
import store from "@/data/store.json";
import styles from "./Logo.module.scss";

type Props = {
  /** header＝マーク＋小さな店名。swapped で店名の文字だけに切り替わる／footer＝店名の文字だけ */
  variant?: "header" | "footer";
  /** ヘッダーで一定量スクロールしたら true（Header が渡す） */
  swapped?: boolean;
};

/** ロゴ。マークは元のロゴ（猫・王冠・バーガー・牛）から店名の文字だけを外したもの。
 *  店名は Web フォントの文字で添えるので、名前を変えるときは store.json だけ直せばよい */
export default function Logo({ variant = "header", swapped = false }: Props) {
  if (variant === "footer") {
    return (
      <Link href="/" className={`${styles.logo} ${styles.footer}`}>
        {store.name}
      </Link>
    );
  }
  return (
    <Link href="/" className={`${styles.logo} ${styles.header} ${swapped ? styles.isSwapped : ""}`} aria-label={`${store.name} トップページへ`}>
      <span className={styles.markBlock} aria-hidden="true">
        <Image src="/images/logo/logo-mark.svg" alt="" width={916} height={628} className={styles.mark} priority />
        <span className={styles.markName}>{store.nameShort}</span>
      </span>
      <span className={styles.word} aria-hidden="true">
        {store.name}
      </span>
    </Link>
  );
}
