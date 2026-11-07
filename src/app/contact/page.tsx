import type { Metadata } from "next";
import SectionTitle from "@/components/common/SectionTitle";

export const metadata: Metadata = { title: "CONTACT" };

export default function ContactPage() {
  return (
    <section className="section">
      <div className="inner">
        <SectionTitle en="CONTACT" ja="お問い合わせ" as="h1" />
        <p>（骨組み：ステップ 2 で実装）</p>
      </div>
    </section>
  );
}
