# BUN & CO.（制作中）

クラフトバーガー店サイトの React 再構成版。Next.js（App Router）＋ TypeScript ＋ SCSS Modules。

## 位置づけ

実案件（2025年5〜10月／クラフトバーガー店）。クライアントの許可を得て掲載。閉店済みのため、店名・写真・商品・連絡先は架空のものに差し替え。

実装には Claude Code を併用。設計（コンポーネント分割・データ分離の方針）と全コードの確認・判断は本人が行った。

## 担当範囲

- 担当：テーマ設計・HTML/CSS/JavaScript・Instagram表示連携・BGM切替・外部導線（Uber Eats／LINE）
- 担当外：写真・アイコンの加工
- React 版の写真はすべて差し替え（フリー素材または本人撮影）

設計の考え方は [`docs/設計の意図.md`](docs/設計の意図.md)。構成・データ分離・WordPress 版との違いの節は全ページ完成後に書く。

## 開発

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint
npm run build
```

## 仮画像

`public/images/` の画像は寸法だけ合わせた仮画像。`python3 scripts/make_placeholders.py` で再生成できる（要 Pillow）。
写真を用意したら同じファイル名で上書きする。
