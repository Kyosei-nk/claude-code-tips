# PROJECT: Auto-Operated SEO Site — "Claude Code Tips JP"

## Overview

Claude Code の実践的な活用テクニックを日本語で発信する SEO 特化サイトを構築する。
英語圏の一次情報（Anthropic 公式ドキュメント、GitHub Discussions、英語ブログ）を
ソースに、日本語で質の高い技術記事を提供する。

**サイト名案**: `claude-code-tips.dev`（仮）
**ターゲット読者**: 日本語でClaude Codeを使い始めた開発者・非エンジニア
**収益モデル**: Udemy アフィリエイト → Google AdSense → 自作Chrome拡張への導線

---

## 制約条件（重要）

### Claude Pro 環境の制限
- **モデル**: Claude Sonnet（Opus は使用不可）
- **トークン制限**: 1セッションあたりのトークン消費に上限あり
- **対策**:
  - 1回のセッションで処理する記事は **最大2本** に制限
  - 記事生成は段階的に行う（アウトライン → 本文 → SEO最適化を分けて実行）
  - 巨大なコンテキストを避け、CLAUDE.md + 1記事分のデータのみ渡す
  - コード生成とコンテンツ生成のセッションを **分離** する

### インフラの制限
- **サーバー費用**: 月額0円を目指す（GitHub Pages or Cloudflare Pages）
- **ドメイン**: 初期は `github.io` サブドメイン。収益が出たら独自ドメイン取得
- **CI/CD**: GitHub Actions 無料枠（月2,000分）
- **画像**: 自作 or Unsplash（フリー素材）。AI画像生成は使わない

---

## Tech Stack

```
Framework:    Astro（Static Site Generator）
Styling:      Tailwind CSS
Hosting:      GitHub Pages（無料）
Package Mgr:  npm
Content:      Markdown（.md）ファイル → Astro の Content Collections
Search:       Pagefind（静的サイト内検索、ビルド時生成）
Analytics:    Umami（セルフホスト）or Google Analytics
Sitemap:      @astrojs/sitemap（自動生成）
RSS:          @astrojs/rss
OGP画像:      satori + sharp で自動生成
```

### なぜ Astro か
- 静的サイトなのでホスティング無料
- Markdown ベースでClaude Code が記事を `.md` ファイルとして直接生成可能
- React 不要（Island Architecture で必要な箇所だけ JS）
- ビルドが高速（トークン節約に直結）
- SEO に強い（ゼロJS デフォルト、完璧な Lighthouse スコア）

---

## ディレクトリ構造

```
claude-code-tips/
├── CLAUDE.md                  # このファイル（Claude Code への指示書）
├── astro.config.mjs
├── package.json
├── tailwind.config.mjs
├── tsconfig.json
├── public/
│   ├── favicon.svg
│   ├── robots.txt
│   └── images/                # 記事用画像
├── src/
│   ├── layouts/
│   │   ├── BaseLayout.astro   # 共通レイアウト（head, nav, footer）
│   │   └── PostLayout.astro   # 記事ページレイアウト
│   ├── pages/
│   │   ├── index.astro        # トップページ（最新記事一覧）
│   │   ├── about.astro        # 運営者情報
│   │   └── [...slug].astro    # 記事ページ動的ルーティング
│   ├── components/
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   ├── PostCard.astro     # 記事カード（一覧用）
│   │   ├── TOC.astro          # 目次（自動生成）
│   │   ├── RelatedPosts.astro # 関連記事
│   │   └── Affiliate.astro   # アフィリエイトリンクコンポーネント
│   ├── content/
│   │   ├── config.ts          # Content Collections スキーマ定義
│   │   └── posts/             # ★ 記事 Markdown ファイル格納場所
│   │       ├── getting-started-claude-code.md
│   │       ├── claude-code-vs-cursor.md
│   │       └── ...
│   └── styles/
│       └── global.css
├── scripts/
│   ├── generate-article.sh    # 記事生成ヘルパー（Claude Code 呼び出し）
│   └── check-seo.sh           # SEO チェックスクリプト
└── .github/
    └── workflows/
        └── deploy.yml         # GitHub Pages デプロイ
```

---

## Content Collections スキーマ

```typescript
// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const posts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),                          // 記事タイトル（32文字以内推奨）
    description: z.string(),                    // meta description（120文字以内）
    pubDate: z.coerce.date(),                   // 公開日
    updatedDate: z.coerce.date().optional(),    // 更新日
    tags: z.array(z.string()),                  // タグ（3-5個）
    category: z.enum([
      'getting-started',    // 入門・導入
      'tips',               // Tips & テクニック
      'workflow',           // ワークフロー・自動化
      'comparison',         // 比較・レビュー
      'troubleshooting',    // トラブルシューティング
      'advanced',           // 上級テクニック
    ]),
    difficulty: z.enum(['beginner', 'intermediate', 'advanced']),
    readingTime: z.number(),                    // 読了時間（分）
    affiliateLinks: z.array(z.object({          // アフィリエイトリンク
      service: z.string(),
      url: z.string(),
      label: z.string(),
    })).optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { posts };
```

---

## 記事テンプレート

新しい記事を生成する際、以下のフォーマットに従うこと：

```markdown
---
title: "ここにタイトル"
description: "ここにmeta description（120文字以内）"
pubDate: 2026-04-15
tags: ["claude-code", "タグ2", "タグ3"]
category: "tips"
difficulty: "beginner"
readingTime: 8
affiliateLinks:
  - service: "Udemy"
    url: "https://www.udemy.com/course/XXXX/?referralCode=XXXX"
    label: "関連Udemyコース"
draft: false
---

## この記事でわかること

- ポイント1
- ポイント2
- ポイント3

## 本文セクション1

（本文）

## 本文セクション2

（本文）

## まとめ

（要点の整理）

## 次に読む記事

- [関連記事1のタイトル](/posts/slug1)
- [関連記事2のタイトル](/posts/slug2)
```

### 記事執筆ルール

1. **文字数**: 1記事 2,000〜4,000文字（日本語）。長すぎず短すぎず。
2. **見出し構造**: H2 を 3-6個。H3 は必要な場合のみ。H1 は使わない（タイトルが H1）。
3. **コードブロック**: 実際に動くコードを含める。コピペで試せる状態にする。
4. **画像**: 必須ではないが、CLI のスクリーンショット的な表現はコードブロックで代替。
5. **内部リンク**: 他の記事への誘導を最低1箇所入れる。
6. **E-E-A-T**: 「実際に試した」「手元で確認した」という一人称の体験を含める。
7. **アフィリエイト**: 記事末尾に自然な形で Udemy コースや関連ツールを紹介。押し売り厳禁。
8. **著作権**: 他サイトの文章をコピーしない。公式ドキュメントの引用は最小限＋出典明記。
9. **日本語品質**: 「です・ます」調で統一。技術用語は英語のまま使用可（例: headless mode）。
10. **SEO タイトル**: 検索意図を含む。「Claude Code ○○ やり方」「Claude Code ○○ 使い方」形式。

---

## SEO 戦略

### ターゲットキーワード（初期20記事分）

#### Tier 1: 検索ボリューム大・競合少（最優先）
1. `Claude Code 使い方` → 入門ガイド記事
2. `Claude Code インストール` → セットアップ記事
3. `Claude Code 日本語` → 日本語での使い方記事
4. `Claude Code 料金` → プラン比較記事
5. `Claude Code Cursor 違い` → 比較記事

#### Tier 2: ロングテール・具体的な悩み
6. `Claude Code エラー 解決` → トラブルシューティング
7. `Claude Code CLAUDE.md 書き方` → CLAUDE.md ガイド
8. `Claude Code Git 連携` → Git ワークフロー記事
9. `Claude Code MCP 設定` → MCP サーバー入門
10. `Claude Code 自動化 GitHub Actions` → 自動化記事

#### Tier 3: 応用・ニッチ
11. `Claude Code Chrome拡張 開発` → チュートリアル
12. `Claude Code API 使い方` → API 活用記事
13. `Claude Code サブエージェント` → サブエージェント解説
14. `Claude Code React アプリ 作り方` → ハンズオン
15. `Claude Code Python スクリプト` → Python 自動化

#### Tier 4: 比較・選択系
16. `Claude Code vs GitHub Copilot` → 比較
17. `Claude Code vs Windsurf` → 比較
18. `Claude Code Pro Max 違い` → プラン比較
19. `AI コーディング おすすめ 2026` → まとめ記事
20. `Claude Code 副業 稼ぐ` → 活用事例

### 技術的 SEO 要件
- 全ページ Lighthouse スコア 95+ （Performance, SEO, Accessibility）
- Core Web Vitals: LCP < 2.5s, CLS < 0.1, INP < 200ms
- canonical URL 設定
- Open Graph / Twitter Card メタタグ
- 構造化データ（Article schema）
- sitemap.xml 自動生成
- robots.txt 適切な設定
- 日本語の lang="ja" 設定
- パンくずリスト実装

---

## 収益化設計

### Phase 1（0-3ヶ月目）: Udemy アフィリエイト
- Udemy のアフィリエイトプログラム（LinkShare/Rakuten）に登録
- 記事内で関連する Udemy コースを自然に紹介
- 将来的に自分の Udemy コースへの導線にも使える

### Phase 2（3-6ヶ月目）: Google AdSense
- 月間 1,000PV を超えた時点で AdSense 申請
- 記事ページに広告枠を設置（TOC 下 + 記事末尾）

### Phase 3（6ヶ月目〜）: 自作プロダクトへの導線
- 自作 Chrome 拡張の紹介記事
- 自作 Udemy コースの宣伝
- 有料 note 記事への誘導

---

## 自動化パイプライン

### 現在（Claude Pro での半自動運用）

Claude Pro ではヘッドレスモードの自動実行が制限されるため、
**週1回の手動バッチ実行** で運用する。

#### 週次ルーチン（毎週日曜、所要30-60分）

```bash
# Step 1: Claude Code で記事アウトラインを2本生成（10分）
# Claude Code を起動し、以下のプロンプトを入力：
#
# 「CLAUDE.md を読み、SEO戦略のキーワードリストから
#   未執筆のキーワードを2つ選び、
#   記事テンプレートに従ってアウトライン（見出し構成 + 各セクション50字要約）を
#   2本分作成してください。ファイルは src/content/posts/ に保存。」

# Step 2: アウトラインを確認・修正（5分）
# 生成されたアウトラインを確認し、方向性がOKなら次へ

# Step 3: Claude Code で本文を生成（15分 × 2本）
# 「src/content/posts/[ファイル名].md のアウトラインを元に、
#   記事執筆ルールに従って本文を完成させてください。
#   文字数は2,000-4,000文字。コードブロックを含めてください。」
# ※ 1記事ずつ別セッションで実行（トークン節約）

# Step 4: 記事レビュー & 微修正（10分）
# 生成された記事を読み、事実誤認や不自然な表現を修正

# Step 5: Git commit & push（2分）
git add .
git commit -m "feat: add articles - [記事タイトル1], [記事タイトル2]"
git push origin main
# → GitHub Actions が自動でビルド & デプロイ
```

### 将来（Claude Max 移行後の完全自動化）

Claude Max に移行した場合、以下を GitHub Actions で自動実行：

```yaml
# .github/workflows/weekly-content.yml（将来用・参考）
name: Weekly Content Generation
on:
  schedule:
    - cron: '0 9 * * 0'  # 毎週日曜 18:00 JST
  workflow_dispatch:       # 手動実行も可能

jobs:
  generate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Generate article drafts
        run: |
          # Claude Code headless mode で記事生成
          claude -p "CLAUDE.md を読み、未執筆キーワードから1本記事を生成" \
            --allowedTools "Read,Write,Edit" \
            --max-budget-usd 2.00
      - name: Create PR
        run: |
          git checkout -b content/weekly-$(date +%Y%m%d)
          git add src/content/posts/
          git commit -m "content: weekly article generation"
          gh pr create --title "Weekly content update" --body "Auto-generated article for review"
```

---

## 開発フェーズ（Claude Code への実行指示）

### Phase 1: サイト基盤構築（Session 1）

以下を順番に実行してください：

1. `npm create astro@latest claude-code-tips -- --template minimal --typescript strict`
2. Tailwind CSS を追加: `npx astro add tailwind`
3. sitemap を追加: `npx astro add sitemap`
4. `astro.config.mjs` を設定（site URL、integrations）
5. Content Collections のスキーマを `src/content/config.ts` に作成
6. `BaseLayout.astro` と `PostLayout.astro` を作成
7. `Header.astro`、`Footer.astro` コンポーネントを作成
8. トップページ（`index.astro`）に記事一覧を表示
9. 記事ページ（`[...slug].astro`）を作成
10. `robots.txt` と基本的な SEO メタタグを設定

### Phase 2: デザイン & UX（Session 2）

1. Tailwind でミニマルなデザインを適用
   - カラーパレット: 白ベース + アクセントに Anthropic のオレンジ（#D97706）
   - フォント: system-ui（Noto Sans JP は CDN 読み込みが重いため避ける）
   - 最大幅: 680px（読みやすさ重視）
2. PostCard コンポーネント（タイトル + 説明 + 日付 + タグ）
3. TOC（目次）コンポーネント（記事内の H2 を自動取得）
4. RelatedPosts コンポーネント（同じカテゴリの記事を3件表示）
5. レスポンシブ対応（モバイルファースト）
6. ダークモード対応（prefers-color-scheme）
7. Lighthouse 95+ を確認

### Phase 3: 初期コンテンツ（Session 3-5）

Tier 1 キーワードから **最初の5記事** を作成：

1. 「Claude Code 使い方 完全ガイド【2026年最新】」
2. 「Claude Code のインストール方法と初期設定」
3. 「Claude Code を日本語で使うコツと注意点」
4. 「Claude Code の料金プラン比較（Pro / Max）」
5. 「Claude Code と Cursor の違いを徹底比較」

**各記事は別セッションで生成すること**（トークン制限対策）。

### Phase 4: デプロイ & 運用開始（Session 6）

1. GitHub リポジトリ作成 & push
2. GitHub Pages or Cloudflare Pages でデプロイ設定
3. Google Search Console に登録
4. sitemap.xml を送信
5. Umami or Google Analytics を設置
6. Udemy アフィリエイトリンクのテスト

---

## 品質チェックリスト（記事公開前）

各記事を公開する前に、以下を確認：

- [ ] タイトルが32文字以内で検索キーワードを含む
- [ ] meta description が120文字以内で記事内容を正確に要約
- [ ] H2 見出しが3-6個で論理的な構造
- [ ] コードブロックが最低1つ含まれ、コピペで動く
- [ ] 内部リンクが最低1箇所
- [ ] 誤字脱字なし
- [ ] 事実誤認なし（公式ドキュメントと照合）
- [ ] 「です・ます」調で統一
- [ ] frontmatter が全フィールド正しく設定
- [ ] `draft: false` に設定
- [ ] 画像がある場合 alt テキスト設定済み

---

## 注意事項

- **著作権**: Anthropic 公式ドキュメントの丸コピーは禁止。要約・引用は出典明記。
- **正確性**: Claude Code の仕様は変化が激しい。公式ドキュメントの URL を記事内に含め、「最新情報は公式を確認」と注記する。
- **アフィリエイト**: 景品表示法に基づき、アフィリエイトリンクがある記事には「PR」表記を含める。
- **更新**: 情報が古くなった記事は `updatedDate` を更新し、内容を改訂する。
