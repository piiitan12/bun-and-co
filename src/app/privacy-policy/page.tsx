import type { Metadata } from "next";
import SectionTitle from "@/components/common/SectionTitle";

export const metadata: Metadata = { title: "PRIVACY POLICY" };

export default function PrivacyPolicyPage() {
  return (
    <section className="section">
      <div className="inner">
        <SectionTitle en="PRIVACY POLICY" ja="プライバシーポリシー" as="h1" />
        <p>（骨組み：ステップ 2 で実装）</p>
      </div>
    </section>
  );
}
