import type { MenuItem, MenuSection as MenuSectionType } from "@/types/data";
import FadeIn from "@/components/common/FadeIn";
import MenuCard from "./MenuCard";
import PriceTable from "./PriceTable";
import styles from "./MenuSection.module.scss";

type Props = { section: MenuSectionType; onSelect: (item: MenuItem) => void };

/** 見出し＋商品一覧。`layout` が card なら写真つきカード、list なら名前と価格の表 */
export default function MenuSection({ section, onSelect }: Props) {
  return (
    <section id={section.id} className={styles.section} aria-labelledby={`menu-${section.id}`}>
      <h2 id={`menu-${section.id}`} className={styles.title}>
        {section.title}
      </h2>
      {section.layout === "card" ? (
        <ul className={styles.grid}>
          {section.items.map((item, i) => (
            <li key={item.id}>
              <FadeIn delay={(i % 3) * 80}>
                <MenuCard item={item} onSelect={onSelect} />
              </FadeIn>
            </li>
          ))}
        </ul>
      ) : (
        <FadeIn>
          <PriceTable items={section.items} note={section.note} />
        </FadeIn>
      )}
    </section>
  );
}
