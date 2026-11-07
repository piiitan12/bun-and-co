import Image from "next/image";
import store from "@/data/store.json";
import FadeIn from "@/components/common/FadeIn";
import BgmToggle from "./BgmToggle";
import styles from "./About.module.scss";

export default function About() {
  return (
    <section id="about" className={`section ${styles.about}`}>
      <div className={`inner ${styles.grid}`}>
        <FadeIn className={styles.textCol}>
          <p className={styles.kicker}>
            <span className={styles.badge}>{store.openedLabel}</span>
            GRAND OPEN!
          </p>
          <h2 className={styles.title}>{store.tagline}</h2>
          <div className={styles.body}>
            {store.about.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <BgmToggle />
        </FadeIn>
        <FadeIn className={styles.imgCol} delay={150}>
          <Image src="/images/about/about-01.png" alt="店内の様子（仮画像）" width={1200} height={800} sizes="(min-width: 1024px) 50vw, 100vw" className={styles.img} />
        </FadeIn>
      </div>
    </section>
  );
}
