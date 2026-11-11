import Image from "next/image";
import news from "@/data/news.json";
import store from "@/data/store.json";
import type { NewsPost } from "@/types/data";
import SectionTitle from "@/components/common/SectionTitle";
import FadeIn from "@/components/common/FadeIn";
import styles from "./News.module.scss";
import ExternalLink from "@/components/common/ExternalLink";

const posts = news.posts as NewsPost[];

/** 投稿グリッド。元の WordPress 版は Instagram Feed プラグインのショートコード（Graph API 版は試作のみ）。再構成版は news.json からの静的モック */
export default function News() {
  return (
    <section id="news" className={`section ${styles.news}`}>
      <div className="inner">
        <SectionTitle en="NEWS" ja="最新の投稿" />
        <ul className={styles.grid}>
          {posts.map((post, i) => (
            <li key={post.id} className={styles.item}>
              <FadeIn delay={i * 60}>
              <figure>
                <Image src={post.image} alt={post.caption} width={600} height={600} sizes="(min-width: 1024px) 16vw, 33vw" className={styles.img} />
                <figcaption className={styles.caption}>
                  <time dateTime={post.date} className={styles.date}>
                    {post.date.replace(/-/g, ".")}
                  </time>
                  <span>{post.caption}</span>
                </figcaption>
              </figure>
              </FadeIn>
            </li>
          ))}
        </ul>
        <p className={styles.more}>
          <ExternalLink href={store.links.instagram} className={styles.moreLink} aria-label="Instagram を見る（ダミーリンク）">
            VIEW MORE
          </ExternalLink>
        </p>
      </div>
    </section>
  );
}
