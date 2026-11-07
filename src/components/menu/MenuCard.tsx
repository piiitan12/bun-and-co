"use client";

import Image from "next/image";
import type { MenuItem } from "@/types/data";
import styles from "./MenuCard.module.scss";

type Props = { item: MenuItem; onSelect?: (item: MenuItem) => void };

/** 写真・名前・価格・説明のカード。クリックで親（MenuSection / MenuPreview）が持つモーダルを開く */
export default function MenuCard({ item, onSelect }: Props) {
  const body = (
    <>
      {item.image && (
        <div className={styles.imgWrap}>
          <Image src={item.image} alt={item.name} width={800} height={600} sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw" className={styles.img} />
        </div>
      )}
      <div className={styles.body}>
        <h3 className={styles.name}>{item.name}</h3>
        <p className={styles.price}>¥{item.price.toLocaleString()}</p>
        {item.description && <p className={styles.desc}>{item.description}</p>}
      </div>
    </>
  );

  return onSelect ? (
    <button type="button" className={`${styles.card} ${styles.clickable}`} onClick={() => onSelect(item)} aria-haspopup="dialog">
      {body}
    </button>
  ) : (
    <div className={styles.card}>{body}</div>
  );
}
