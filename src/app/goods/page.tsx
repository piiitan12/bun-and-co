import type { Metadata } from "next";
import store from "@/data/store.json";
import goods from "@/data/goods.json";
import SectionTitle from "@/components/common/SectionTitle";
import GoodsList from "@/components/goods/GoodsList";
import styles from "./page.module.scss";

export const metadata: Metadata = {
  title: "GOODS",
  description: `${store.name} のオリジナルグッズ。キャップ・Tシャツ・エコバッグなど。`,
};

export default function GoodsPage() {
  return (
    <>
      <section className={`section ${styles.intro}`}>
        <div className="inner">
          <SectionTitle en="GOODS" ja="オリジナルグッズ" as="h1" />
          <div className={styles.lead}>
            {goods.intro.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <p className={styles.note}>{goods.note}</p>
          </div>
        </div>
      </section>
      <section className={`section ${styles.list}`}>
        <div className="inner">
          <GoodsList />
        </div>
      </section>
    </>
  );
}
