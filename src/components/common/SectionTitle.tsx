import styles from "./SectionTitle.module.scss";

type Props = { en: string; ja?: string; as?: "h1" | "h2"; align?: "left" | "center"; tone?: "dark" | "light" };

/** 英字の見出し＋日本語の添え字。下線がのびるアニメーションは CSS だけで行う */
export default function SectionTitle({ en, ja, as = "h2", align = "left", tone = "dark" }: Props) {
  const Tag = as;
  return (
    <div className={`${styles.wrap} ${styles[align]} ${styles[tone]}`}>
      <Tag className={styles.en}>{en}</Tag>
      {ja && <p className={styles.ja}>{ja}</p>}
    </div>
  );
}
