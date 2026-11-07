import type { Metadata } from "next";
import privacy from "@/data/privacy.json";
import store from "@/data/store.json";
import SectionTitle from "@/components/common/SectionTitle";
import styles from "./page.module.scss";

export const metadata: Metadata = {
  title: "PRIVACY POLICY",
  description: `${store.name} のプライバシーポリシー。`,
};

/** 条文は privacy.json から出す。項目の増減・文言の変更はデータだけで済む */
export default function PrivacyPolicyPage() {
  return (
    <section className={`section ${styles.privacy}`}>
      <div className="inner">
        <SectionTitle en="PRIVACY POLICY" ja={privacy.title} as="h1" />
        <div className={styles.body}>
          <p className={styles.intro}>{privacy.intro}</p>
          {privacy.sections.map((s, i) => (
            <section key={s.heading} className={styles.item} aria-labelledby={`pp-${i + 1}`}>
              <h2 id={`pp-${i + 1}`} className={styles.heading}>
                {s.heading}
              </h2>
              <p>{s.body}</p>
            </section>
          ))}
          <p className={styles.updated}>
            制定日：{privacy.updated}
            <br />
            {store.name}
          </p>
        </div>
      </div>
    </section>
  );
}
