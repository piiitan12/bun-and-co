import type { MenuItem } from "@/types/data";
import styles from "./PriceTable.module.scss";

type Props = { items: MenuItem[]; note?: string };

/** 名前＋価格だけの表（ドリンク・フロート・アルコール）。写真のない品はこちら */
export default function PriceTable({ items, note }: Props) {
  return (
    <div className={styles.wrap}>
      {note && <p className={styles.note}>{note}</p>}
      <dl className={styles.table}>
        {items.map((item) => (
          <div key={item.id} className={styles.row}>
            <dt className={styles.name}>{item.name}</dt>
            <dd className={styles.price}>¥{item.price.toLocaleString()}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
