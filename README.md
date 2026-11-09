# BUN & CO.

クラフトバーガー店サイトの React 再構成版。Next.js（App Router）＋ TypeScript ＋ SCSS Modules。

## 位置づけ

実案件（2025年5〜10月／クラフトバーガー店）。クライアントの許可を得て掲載。閉店済みのため、店名・商品・連絡先は架空のものに差し替え。

実装には Claude Code を併用。設計（コンポーネント分割・データ分離の方針）と全コードの確認・判断は本人が行った。

## 担当範囲

- 担当：テーマ設計・HTML/CSS/JavaScript・Instagram表示連携・BGM切替・外部導線（Uber Eats／LINE）・アイコン制作（音楽ボタン・配達アイコン）・ロゴ制作への参加
- 担当外：写真の加工
- 写真は元サイトと同じフリー素材を使用（グッズのみ Unsplash）

## 構成

```
src/
  app/                 ページ（TOP・MENU・GOODS・CONTACT・PRIVACY POLICY・404）
  components/
    layout/            全ページ共通（Header・DrawerNav・Footer・PageTop）
    common/            複数ページで使う小さな部品（Logo・StoreInfo・SectionTitle・Icon・FadeIn）
    home/ menu/ goods/ contact/   そのページの部品
  data/                文言・商品・店舗情報（JSON）
  styles/              色・余白・文字の段階の変数と mixin
```

- **「どこで使うか」で置き場を分けた。**全ページ共通は `layout/`、2 ページ以上で使うものは `common/`、1 ページだけのものはページ名のフォルダ。部品を直すとき、影響する範囲がフォルダ名で分かる
- **同じ見た目は同じ部品にした。**商品カード（`MenuCard`）と詳細モーダル（`ProductModal`）は、トップ・MENU・GOODS の 3 か所で同じものを使う。店舗情報（`StoreInfo`）はフッターと ACCESS で共用
- **状態を持つ部品だけをクライアントコンポーネントにした**（ヘッダーの開閉・BGM・モーダル・フォームなど）。それ以外はサーバーで HTML にする

部品ごとの理由は [`docs/設計の意図.md`](docs/設計の意図.md)。各ページのスクリーンショット（375px／1440px）は `docs/screenshots/`。

## データ分離

文言・商品・店舗情報は `src/data/*.json` にあり、コードを触らずに差し替えられる。

例：バーガーを 1 品足すときは、`menu.json` の `burgers` の `items` に 1 件足すだけ。

```json
{
  "id": "smoky-bbq",
  "name": "SMOKY BBQ",
  "price": 1400,
  "description": "スモークしたベーコンと BBQ ソース。",
  "image": "/images/burgers/burger-07.jpg"
}
```

画像は `public/images/burgers/` に置く。これで MENU ページにカードが 1 枚増え、押すと同じ形の詳細モーダルが開く。カテゴリを足すときも `sections` に 1 件足せば、見出し・ページ内リンク・一覧がそろって増える。

店名を変えるときは、`store.json` の `name`（ロゴ・ページのタイトル）、`nameShort`（ロゴの小さな店名）、`copyright` の 3 つを直せば、全ページで変わる。

## WordPress 版との違い

| | WordPress 版（元） | React 版（このリポジトリ） |
|---|---|---|
| 作り | 専用テーマ（PHP テンプレート 12 本） | Next.js（App Router）のページと部品 |
| 動き | jQuery（`script.js` 191 行：ハンバーガー・商品モーダル・フェード・BGM） | React の状態と標準 API（`IntersectionObserver`・`<dialog>`・CSS アニメーション）。jQuery なし |
| CSS | 素の CSS 6 本（約 2,300 行） | SCSS Modules（1 部品 1 ファイル）＋変数と mixin |
| 文言・商品 | PHP に直書き。メニューは管理画面 | JSON（上の「データ分離」） |
| Instagram | Instagram Feed プラグインのショートコード | `news.json` の静的モック（API キーを持たない） |
| 404 | 「404」と出すだけ | 見出し・案内文・トップへのボタン・主なページへのリンク（検索エンジンには載せない） |
| お問い合わせ | Contact Form 7 | 入力の確認つきフォーム（作品のため送信先なし） |
| 地図 | Google マップの埋め込み | 案内図（架空の店のため、実在の地図ではなく図にした） |

## 開発

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint
npm run build
```

## 公開

- Vercel（https://bun-and-co.vercel.app）。`main` に push すると本番に出し直される
- 環境変数は `NEXT_PUBLIC_SITE_URL`（公開 URL。OGP 画像の絶対 URL に使う）の 1 つだけ
- 架空の店の作品なので、検索結果には出さない（全ページに `noindex`、応答ヘッダーに `X-Robots-Tag`）。URL を渡して見てもらう前提

## 画像

- 写真（メインビジュアル・メニュー・NEWS・ABOUT）は、元サイトと同じフリー素材。メニューの写真は元サイトと同じ正方形で使う
- ACCESS の案内図と OGP 画像は `scripts/art/` の HTML から作った（Chrome のヘッドレスで撮影）。店名や道の名前を変えたら撮り直す
- GOODS の写真は Unsplash のもの（ロゴや文字の入っていない商品写真）。撮影者と元のページは `docs/写真の出典.md`
