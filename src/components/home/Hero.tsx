import Image from "next/image";
import hero from "@/data/hero.json";
import store from "@/data/store.json";
import type { HeroImage } from "@/types/data";
import BgmToggle from "./BgmToggle";
import styles from "./Hero.module.scss";

const images = hero.images as HeroImage[];

/** 6 枚の写真が順にフェードするメインビジュアル。動きは CSS アニメーションだけ（JS なし）。
 *  文字は元テーマと同じ「開店年月＋GRAND OPEN!」。左に斜めの影をかけて文字を読みやすくする */
export default function Hero() {
  return (
    <section className={styles.hero} aria-label="メインビジュアル">
      <ul className={styles.slides}>
        {images.map((img, i) => (
          <li
            key={img.src}
            className={styles.slide}
            style={{ animationDelay: `${i * 5}s`, animationDuration: `${images.length * 5}s` }}
          >
            <Image src={img.src} alt={img.alt} fill sizes="100vw" priority={i === 0} className={styles.img} />
          </li>
        ))}
      </ul>
      <div className={styles.shade} aria-hidden="true" />
      <div className={styles.wedge} aria-hidden="true" />
      <div className={styles.text}>
        <h1 className="sr-only">{store.name}</h1>
        <p className={styles.date}>{store.openedLabel}</p>
        <p className={styles.title}>GRAND OPEN!</p>
      </div>
      <a href="#about" className={styles.scroll} aria-label="下へスクロール">
        <span className={styles.scrollText}>SCROLL</span>
        <span className={styles.scrollLine} aria-hidden="true" />
      </a>
      <BgmToggle />
    </section>
  );
}
