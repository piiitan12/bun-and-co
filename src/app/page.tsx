import store from "@/data/store.json";

export default function HomePage() {
  return (
    <section className="section">
      <div className="inner">
        <h1>{store.name}</h1>
        <p>{store.tagline}</p>
        <p>（骨組み：トップページ。ステップ 2 で実装）</p>
      </div>
    </section>
  );
}
