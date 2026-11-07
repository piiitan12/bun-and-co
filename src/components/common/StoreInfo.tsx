import store from "@/data/store.json";
import styles from "./StoreInfo.module.scss";

type Props = { tone?: "dark" | "light" };

/** 住所・電話・営業時間・定休日。store.json を表示するだけ（フッターと ACCESS で共用） */
export default function StoreInfo({ tone = "dark" }: Props) {
  return (
    <dl className={`${styles.info} ${styles[tone]}`}>
      <div className={styles.row}>
        <dt>住所</dt>
        <dd>
          {store.address.postal}
          <br />
          {store.address.line1}
          <br />
          {store.address.line2}
        </dd>
      </div>
      <div className={styles.row}>
        <dt>電話</dt>
        <dd>
          <a href={`tel:${store.tel.replace(/-/g, "")}`}>{store.tel}</a>
        </dd>
      </div>
      <div className={styles.row}>
        <dt>営業時間</dt>
        <dd>
          {store.hours.map((h) => (
            <div key={h.label} className={styles.hours}>
              <span className={styles.hoursLabel}>{h.label}</span>
              <span>{h.times.join(" ／ ")}</span>
            </div>
          ))}
        </dd>
      </div>
      <div className={styles.row}>
        <dt>定休日</dt>
        <dd>{store.closed.replace("定休日：", "")}</dd>
      </div>
    </dl>
  );
}
