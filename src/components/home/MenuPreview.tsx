"use client";

import { useState } from "react";
import Link from "next/link";
import menu from "@/data/menu.json";
import type { MenuItem, MenuSection } from "@/types/data";
import SectionTitle from "@/components/common/SectionTitle";
import FadeIn from "@/components/common/FadeIn";
import MenuCard from "@/components/menu/MenuCard";
import ProductModal from "@/components/menu/ProductModal";
import styles from "./MenuPreview.module.scss";

const burgers = (menu.sections as MenuSection[]).find((s) => s.id === "burgers")?.items.slice(0, 4) ?? [];

/** トップの MENU 抜粋。バーガー 4 品だけ出し、全部は /menu へ */
export default function MenuPreview() {
  const [selected, setSelected] = useState<MenuItem | null>(null);

  return (
    <section id="menu" className={`section ${styles.menu}`}>
      <div className="inner">
        <SectionTitle en="MENU" ja="毎日手ごねのパティと焼きたてのバンズ" />
        <ul className={styles.grid}>
          {burgers.map((item, i) => (
            <li key={item.id}>
              <FadeIn delay={i * 100}>
                <MenuCard item={item} onSelect={setSelected} />
              </FadeIn>
            </li>
          ))}
        </ul>
        <p className={styles.more}>
          <Link href="/menu" className={styles.moreLink}>
            VIEW ALL MENU
          </Link>
        </p>
      </div>
      <ProductModal item={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
