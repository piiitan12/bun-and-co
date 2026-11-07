import store from "@/data/store.json";
import Icon from "./Icon";
import styles from "./StoreInfo.module.scss";

type Props = { tone?: "dark" | "light" };

/** 住所・電話・営業時間・定休日。見出しに元テーマと同じ 4 つのアイコン（場所・電話・時計・カレンダー）を付ける。store.json を表示するだけ（フッターと ACCESS で共用） */
export default function StoreInfo({ tone = "dark" }: Props) {
  return (
    <dl className={`${styles.info} ${styles[tone]}`}>
      <div className={styles.row}>
        <dt>
          <Icon name="location" size={16} className={styles.icon} />
          住所
        </dt>
        <dd>
          {store.address.postal}
          <br />
          {store.address.line1}
          <br />
          {store.address.line2}
        </dd>
      </div>
      <div className={styles.row}>
        <dt>
          <Icon name="phone" size={16} className={styles.icon} />
          電話
        </dt>
        <dd>
          <a href={`tel:${store.tel.replace(/-/g, "")}`}>{store.tel}</a>
        </dd>
      </div>
      <div className={styles.row}>
        <dt>
          <Icon name="clock" size={16} className={styles.icon} />
          営業時間
        </dt>
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
        <dt>
          <Icon name="calendar" size={16} className={styles.icon} />
          定休日
        </dt>
        <dd>{store.closed.replace("定休日：", "")}</dd>
      </div>
    </dl>
  );
}
