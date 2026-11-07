import Image from "next/image";
import gallery from "@/data/gallery.json";
import type { HeroImage } from "@/types/data";
import styles from "./PhotoLoop.module.scss";

const images = gallery.images as HeroImage[];

/** 写真が横に流れ続ける帯（元テーマの .loop、90 秒で 1 周）。
 *  同じ並びを 2 回つなげ、全体の半分だけ左へ動かしてから最初に戻すので、継ぎ目が見えない。JS なし */
export default function PhotoLoop() {
  return (
    <section className={styles.wrap} aria-label="フォトギャラリー">
      <div className={styles.track}>
        {[0, 1].map((round) => (
          <ul key={round} className={styles.list} aria-hidden={round === 1 ? true : undefined}>
            {images.map((img) => (
              <li key={`${round}-${img.src}`} className={styles.item}>
                <Image src={img.src} alt={round === 0 ? img.alt : ""} width={800} height={600} sizes="300px" className={styles.img} />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </section>
  );
}
