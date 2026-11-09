import type { NextConfig } from "next";

// 公開時に付けるセキュリティ用の応答ヘッダー（全ページ共通）
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" }, // ファイルの種類を推測させない
  { key: "X-Frame-Options", value: "DENY" }, // 他のサイトの枠（iframe）に入れさせない
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" }, // 外部へ渡す参照元を最小限に
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" }, // 使わない機能を止める
  { key: "X-Robots-Tag", value: "noindex, nofollow" }, // 検索結果に出さない（画像などページ以外のファイルも含めて）
];

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
