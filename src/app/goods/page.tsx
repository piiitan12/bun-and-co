import type { Metadata } from "next";
import SectionTitle from "@/components/common/SectionTitle";

export const metadata: Metadata = { title: "GOODS" };

export default function GoodsPage() {
  return (
    <section className="section">
      <div className="inner">
        <SectionTitle en="GOODS" ja="オリジナルグッズ" as="h1" />
        <p>（骨組み：ステップ 2 で実装）</p>
      </div>
    </section>
  );
}
