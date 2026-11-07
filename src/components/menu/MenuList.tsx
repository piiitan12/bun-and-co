"use client";

import { useState } from "react";
import menu from "@/data/menu.json";
import type { MenuItem, MenuSection as MenuSectionType } from "@/types/data";
import MenuSection from "./MenuSection";
import ProductModal from "./ProductModal";
import styles from "./MenuList.module.scss";

const sections = menu.sections as MenuSectionType[];

/** MENU ページの本体。セクション内リンク（ページ内ジャンプ）とモーダルの状態をここで持つ */
export default function MenuList() {
  const [selected, setSelected] = useState<MenuItem | null>(null);

  return (
    <>
      <nav className={styles.jump} aria-label="メニューのカテゴリ">
        <ul className={styles.jumpList}>
          {sections.map((s) => (
            <li key={s.id}>
              <a href={`#${s.id}`} className={styles.jumpLink}>
                {s.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      {sections.map((s) => (
        <MenuSection key={s.id} section={s} onSelect={setSelected} />
      ))}
      <ProductModal item={selected} onClose={() => setSelected(null)} />
    </>
  );
}
