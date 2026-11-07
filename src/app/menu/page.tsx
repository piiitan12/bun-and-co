import type { Metadata } from "next";
import store from "@/data/store.json";
import SectionTitle from "@/components/common/SectionTitle";
import MenuList from "@/components/menu/MenuList";
import styles from "./page.module.scss";

export const metadata: Metadata = {
  title: "MENU",
  description: `${store.name} のメニュー。バーガー・サイド・ドリンク・フロート・アルコール。`,
};

export default function MenuPage() {
  return (
    <>
      <section className={`section ${styles.intro}`}>
        <div className="inner">
          <SectionTitle en="MENU" ja="メニュー" as="h1" />
          <div className={styles.about}>
            {store.about.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
      </section>
      <section className={`section ${styles.list}`}>
        <div className="inner">
          <MenuList />
        </div>
      </section>
    </>
  );
}
