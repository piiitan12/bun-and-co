import Link from "next/link";
import nav from "@/data/nav.json";
import store from "@/data/store.json";
import type { NavItem } from "@/types/data";
import Image from "next/image";
import Logo from "@/components/common/Logo";
import Icon from "@/components/common/Icon";
import StoreInfo from "@/components/common/StoreInfo";
import styles from "./Footer.module.scss";
import ExternalLink from "@/components/common/ExternalLink";

const footerNav = nav.footer as NavItem[];
const socialNav = nav.social as NavItem[];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`${styles.inner} inner`}>
        <div className={styles.colLogo}>
          <Logo variant="footer" />
          <p className={styles.tagline}>{store.tagline}</p>
        </div>
        <div className={styles.colInfo}>
          <StoreInfo tone="light" />
        </div>
        <div className={styles.colNav}>
          <nav aria-label="フッターメニュー">
            <ul className={styles.navList}>
              {footerNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
          <ul className={styles.social} aria-label="SNS・外部サービス（ダミーリンク）">
            {socialNav.map((item) => (
              <li key={item.label}>
                <ExternalLink href={item.href} className={styles.socialLink}>
                  {item.icon === "uber" ? (
                    <Image src="/images/icons/delivery.svg" alt="" width={110} height={110} className={styles.socialImg} />
                  ) : (
                    item.icon && <Icon name={item.icon} size={20} />
                  )}
                  {item.label}
                </ExternalLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <p className={styles.copy}>
        <small>{store.copyright}</small>
      </p>
    </footer>
  );
}
