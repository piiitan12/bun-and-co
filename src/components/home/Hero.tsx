import Image from "next/image";
import hero from "@/data/hero.json";
import store from "@/data/store.json";
import type { HeroImage } from "@/types/data";
import styles from "./Hero.module.scss";

const images = hero.images as HeroImage[];

/** 6 枚の写真が順にフェードするメインビジュアル。動きは CSS アニメーションだけ（JS なし） */
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
      <div className={styles.shadeL} aria-hidden="true" />
      <div className={styles.shadeR} aria-hidden="true" />
      <div className={styles.text}>
        <p className={styles.kicker}>CRAFT BURGER &amp; CAFE</p>
        <h1 className={styles.title}>{store.name}</h1>
        <p className={styles.lead}>
          {store.lead.split("\n").map((line) => (
            <span key={line}>
              {line}
              <br />
            </span>
          ))}
        </p>
      </div>
      <a href="#about" className={styles.scroll} aria-label="下へスクロール">
        <span className={styles.scrollLine} aria-hidden="true" />
        SCROLL
      </a>
    </section>
  );
}
