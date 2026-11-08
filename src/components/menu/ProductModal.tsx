"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import type { MenuItem } from "@/types/data";
import styles from "./ProductModal.module.scss";

type Props = { item: MenuItem | null; onClose: () => void };

/** 商品の詳細モーダル。元テーマは footer.php に 1 つだけ置いた枠を jQuery で書き換えていた。
 *  ここでは <dialog> を使い、Esc・背景クリックで閉じる。フォーカスはブラウザが dialog に移す */
export default function ProductModal({ item, onClose }: Props) {
  const ref = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (item && !dialog.open) dialog.showModal();
    if (!item && dialog.open) dialog.close();
  }, [item]);

  return (
    <dialog
      ref={ref}
      className={styles.dialog}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose(); // 背景クリックで閉じる
      }}
      aria-labelledby="product-modal-title"
    >
      {item && (
        <div className={styles.content}>
          <button type="button" className={styles.close} onClick={onClose} aria-label="閉じる">
            ×
          </button>
          {item.image && (
            <div className={styles.imgWrap}>
              <Image src={item.image} alt={item.name} width={800} height={800} sizes="(min-width: 768px) 480px, 90vw" />
            </div>
          )}
          <div className={styles.details}>
            <h3 id="product-modal-title" className={styles.name}>
              {item.name}
            </h3>
            <p className={styles.price}>¥{item.price.toLocaleString()}</p>
            {item.description && <p className={styles.desc}>{item.description}</p>}
            {item.options && <p className={styles.options}>（{item.options.join(" / ")}）</p>}
          </div>
        </div>
      )}
    </dialog>
  );
}
