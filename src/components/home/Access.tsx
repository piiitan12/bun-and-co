import Image from "next/image";
import store from "@/data/store.json";
import SectionTitle from "@/components/common/SectionTitle";
import StoreInfo from "@/components/common/StoreInfo";
import FadeIn from "@/components/common/FadeIn";
import Icon from "@/components/common/Icon";
import styles from "./Access.module.scss";
import ExternalLink from "@/components/common/ExternalLink";

/** 店舗情報＋案内図。架空の店なので地図は埋め込まず、scripts/art/map.html から作った図を置く */
export default function Access() {
  return (
    <section id="access" className={`section ${styles.access}`}>
      <div className={`inner ${styles.grid}`}>
        <FadeIn>
          <SectionTitle en="ACCESS" ja="店舗情報" />
          <StoreInfo />
          <ul className={styles.external} aria-label="外部サービス（ダミーリンク）">
            <li>
              <ExternalLink href={store.links.uberEats} className={`${styles.cta} ${styles.delivery}`}>
                <Image src="/images/icons/delivery.svg" alt="" width={110} height={110} className={styles.ctaImg} />
                Uber Eats で注文する
              </ExternalLink>
            </li>
            <li>
              <ExternalLink href={store.links.line} className={styles.cta}>
                <Icon name="line" size={24} />
                LINE で友だち追加
              </ExternalLink>
            </li>
          </ul>
        </FadeIn>
        <FadeIn delay={150}>
          <Image src="/images/access/access-map.png" alt="店舗周辺の案内図。○○駅から○○通りを進み、公園の手前" width={1200} height={600} sizes="(min-width: 1024px) 50vw, 100vw" className={styles.map} />
        </FadeIn>
      </div>
    </section>
  );
}
