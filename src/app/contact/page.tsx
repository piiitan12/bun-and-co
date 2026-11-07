import type { Metadata } from "next";
import store from "@/data/store.json";
import SectionTitle from "@/components/common/SectionTitle";
import ContactForm from "@/components/contact/ContactForm";
import styles from "./page.module.scss";

export const metadata: Metadata = {
  title: "CONTACT",
  description: `${store.name} へのお問い合わせ。ご予約・お店について・取材のご依頼など。`,
};

export default function ContactPage() {
  return (
    <section className={`section ${styles.contact}`}>
      <div className={`inner ${styles.grid}`}>
        <div className={styles.side}>
          <SectionTitle en="CONTACT" ja="お問い合わせ" as="h1" />
          <p className={styles.lead}>お店に関するご質問や取材のご依頼など、お気軽にお問い合わせください。</p>
          <dl className={styles.tel}>
            <dt>お電話でのご予約・お問い合わせ</dt>
            <dd>
              <a href={`tel:${store.tel.replace(/-/g, "")}`} className={styles.telNum}>
                {store.tel}
              </a>
            </dd>
            <dd className={styles.telNote}>営業時間内に承ります（{store.closed}）</dd>
          </dl>
        </div>
        <div className={styles.formCol}>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
