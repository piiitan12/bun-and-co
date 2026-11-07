import Link from "next/link";
import SectionTitle from "@/components/common/SectionTitle";

export default function NotFound() {
  return (
    <section className="section">
      <div className="inner">
        <SectionTitle en="404" ja="ページが見つかりません" as="h1" />
        <p>
          お探しのページは移動したか、削除された可能性があります。
          <br />
          <Link href="/">トップページへ戻る</Link>
        </p>
      </div>
    </section>
  );
}
