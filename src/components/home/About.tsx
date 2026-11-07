import Image from "next/image";
import store from "@/data/store.json";
import FadeIn from "@/components/common/FadeIn";
import SectionTitle from "@/components/common/SectionTitle";
import styles from "./About.module.scss";

export default function About() {
  return (
    <section id="about" className={`section ${styles.about}`}>
      <div className={`inner ${styles.grid}`}>
        <FadeIn className={styles.textCol}>
          <SectionTitle en="ABOUT" ja="お店について" />
          <p className={styles.lead}>{store.tagline}</p>
          <div className={styles.body}>
            {store.about.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </FadeIn>
        <FadeIn className={styles.imgCol} delay={150}>
          <Image src="/images/about/about-01.png" alt="店内の様子（仮画像）" width={1200} height={800} sizes="(min-width: 1024px) 50vw, 100vw" className={styles.img} />
        </FadeIn>
      </div>
    </section>
  );
}
