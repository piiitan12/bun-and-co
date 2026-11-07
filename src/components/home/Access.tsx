import Image from "next/image";
import store from "@/data/store.json";
import SectionTitle from "@/components/common/SectionTitle";
import StoreInfo from "@/components/common/StoreInfo";
import FadeIn from "@/components/common/FadeIn";
import Icon from "@/components/common/Icon";
import styles from "./Access.module.scss";

/** 店舗情報＋地図。架空の店なので地図は埋め込まず、仮画像を置く（本人が差し替え） */
export default function Access() {
  return (
    <section id="access" className={`section ${styles.access}`}>
      <div className={`inner ${styles.grid}`}>
        <FadeIn>
          <SectionTitle en="ACCESS" ja="店舗情報" />
          <StoreInfo />
          <ul className={styles.external} aria-label="外部サービス（ダミーリンク）">
            <li>
              <a href={store.links.uberEats} className={`${styles.cta} ${styles.delivery}`}>
                <Image src="/images/icons/delivery.svg" alt="" width={110} height={110} className={styles.ctaImg} />
                Uber Eats で注文する
              </a>
            </li>
            <li>
              <a href={store.links.line} className={styles.cta}>
                <Icon name="line" size={24} />
                LINE で友だち追加
              </a>
            </li>
          </ul>
        </FadeIn>
        <FadeIn delay={150}>
          <Image src="/images/access/access-map.png" alt="店舗周辺の地図（仮画像）" width={1200} height={600} sizes="(min-width: 1024px) 50vw, 100vw" className={styles.map} />
        </FadeIn>
      </div>
    </section>
  );
}
