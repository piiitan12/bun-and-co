import type { Metadata } from "next";
import { Noto_Sans_JP, Oswald, Space_Grotesk } from "next/font/google";
import "./globals.scss";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageTop from "@/components/layout/PageTop";
import store from "@/data/store.json";

const notoSansJp = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-noto-sans-jp",
  display: "swap",
});
const oswald = Oswald({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-oswald",
  display: "swap",
});
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-space-grotesk",
  display: "swap",
});

// 公開 URL は Vercel のデプロイ後に NEXT_PUBLIC_SITE_URL で指定する（未指定なら localhost）
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${store.name}｜クラフトバーガー専門店`,
    template: `%s｜${store.name}`,
  },
  description: store.description,
  openGraph: {
    title: `${store.name}｜クラフトバーガー専門店`,
    description: store.description,
    type: "website",
    images: [{ url: "/images/ogp.png", width: 1200, height: 630 }],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ja" className={`${notoSansJp.variable} ${oswald.variable} ${spaceGrotesk.variable}`}>
      <body>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <PageTop />
      </body>
    </html>
  );
}
