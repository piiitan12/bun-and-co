"use client";

import { useState } from "react";
import goods from "@/data/goods.json";
import type { GoodsItem } from "@/types/data";
import FadeIn from "@/components/common/FadeIn";
import MenuCard from "@/components/menu/MenuCard";
import ProductModal from "@/components/menu/ProductModal";
import styles from "./GoodsList.module.scss";

const items = goods.items as GoodsItem[];

/** グッズの一覧とモーダル。カードとモーダルは MENU と同じ部品を使い、状態は「いま開いている品」1 つだけ持つ */
export default function GoodsList() {
  const [selected, setSelected] = useState<GoodsItem | null>(null);

  return (
    <>
      <h2 className={styles.title}>LINEUP</h2>
      <ul className={styles.grid}>
        {items.map((item, i) => (
          <li key={item.id}>
            <FadeIn delay={(i % 3) * 80}>
              <MenuCard item={item} roomy onSelect={(picked) => setSelected(picked as GoodsItem)} />
            </FadeIn>
          </li>
        ))}
      </ul>
      <ProductModal item={selected} onClose={() => setSelected(null)} />
    </>
  );
}
