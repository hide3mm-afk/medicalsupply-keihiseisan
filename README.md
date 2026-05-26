# 株式会社メディカルサプライ コーポレートサイト

Next.js 16 + TypeScript + Tailwind CSS v4 で構築したコーポレートサイトです。

---

## ローカル起動

```bash
cd C:\claudecode\MSweb\medical-supply-website
npm install
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いてください。

---

## テキスト編集

すべての本文テキストは `lib/content/` 以下のファイルで管理しています。コンポーネントを直接編集する必要はありません。

| ファイル | 対象ページ |
|---|---|
| `lib/content/home.ts` | トップページ（ヒーロー・サービス・強み・パートナー・CTA） |
| `lib/content/services.ts` | サービス一覧ページ |
| `lib/content/company.ts` | 会社情報ページ（ご挨拶・会社概要・取引先・アクセス） |
| `lib/content/navigation.ts` | ヘッダーナビゲーション・ロゴ・CTAボタン |
| `lib/content/footer.ts` | フッター（住所・リンク・コピーライト） |

### お知らせの追加・編集

`lib/news-data.ts` を編集してください。

```ts
// 新しいお知らせを追加する場合は配列の先頭に追加
export const newsData: NewsItem[] = [
  {
    id: "2025-01-01-new-year",          // URL に使われる一意のID（英数字・ハイフンのみ）
    date: "2025年1月1日",
    category: "お知らせ",               // カテゴリ文字列（自由記述）
    title: "新年のご挨拶",
    excerpt: "一覧ページに表示される短い説明文",
    content: `詳細ページに表示される\n本文テキスト（改行は \\n で可）`,
  },
  // 以下既存のデータ...
];
```

---

## 画像の差し替え

画像は `public/images/` に配置してください。

| ファイル名（推奨） | 用途 |
|---|---|
| `hero-bg.jpg` | トップページ ヒーロー背景 |
| `service-ge-ultrasound.jpg` | GE超音波画像診断装置 |
| `service-amethyst.jpg` | アメジスト（放射線防護）|
| `service-clinic-support.jpg` | クリニック開業サポート |
| `service-opus.jpg` | OPUS（シミュレータ） |
| `og-image.jpg` | OGP画像（1200×630px 推奨） |

画像ファイルを配置したら、対応するコンポーネントの `src` を更新してください。例：

```tsx
// components/home/HeroSection.tsx 内の該当箇所を修正
<Image src="/images/hero-bg.jpg" alt="ヒーロー画像" fill className="object-cover" />
```

### Google マップの埋め込み

`app/company/page.tsx` に下記コメントがあります。Google マップの埋め込みコードをここに挿入してください。

```tsx
{/* TODO: Googleマップ埋め込みコードをここに挿入してください */}
```

Google マップで「埋め込み地図の取得」から `<iframe>` タグを取得し、置き換えてください。

---

## お問い合わせフォームのメール送信設定

現在は `console.log` でフォーム内容を出力するのみです。実際のメール送信には [Resend](https://resend.com/) の利用を推奨します。

1. `npm install resend` を実行
2. Resend で API キーを取得し、`.env.local` に設定：
   ```
   RESEND_API_KEY=re_xxxxxxxxxxxx
   ```
3. `app/contact/actions.ts` の TODO 箇所を下記に置き換え：

```ts
import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_API_KEY);

await resend.emails.send({
  from: "no-reply@yourdomain.com",
  to: "info@medical-supply.co.jp",
  subject: `【お問い合わせ】${data.inquiryType} — ${data.name}`,
  text: JSON.stringify(data, null, 2),
});
```

---

## Vercel へのデプロイ

```bash
npm install -g vercel
vercel login
vercel --prod
```

または GitHub リポジトリと Vercel を連携し、`main` ブランチへの push で自動デプロイする方法も推奨します。

### 環境変数（Vercel 管理画面で設定）

| 変数名 | 値 |
|---|---|
| `RESEND_API_KEY` | Resend で発行した API キー |

---

## ディレクトリ構成

```
medical-supply-website/
├── app/
│   ├── layout.tsx          # 共通レイアウト（Header・Footer）
│   ├── page.tsx            # トップページ
│   ├── globals.css         # テーマカラー・フォント設定
│   ├── company/page.tsx    # 会社情報
│   ├── services/page.tsx   # サービス一覧
│   ├── news/
│   │   ├── page.tsx        # お知らせ一覧
│   │   └── [id]/page.tsx   # お知らせ詳細
│   └── contact/
│       ├── page.tsx        # お問い合わせフォーム
│       └── actions.ts      # Server Action（フォーム処理）
├── components/
│   ├── layout/             # Header・Footer
│   ├── home/               # トップページ各セクション
│   ├── services/           # サービスページコンポーネント
│   └── ui/                 # 汎用UIコンポーネント
├── lib/
│   ├── news-data.ts        # お知らせデータ
│   └── content/            # 全ページのテキストコンテンツ
└── public/
    └── images/             # 画像ファイル（ここに配置）
```
