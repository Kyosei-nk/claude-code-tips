---
title: "Claude Code 使い方 完全ガイド【2026年最新】"
description: "Claude Codeのインストールから基本的な使い方まで、日本語で分かりやすく解説します。初心者でも15分で使い始められる実践的ガイドです。"
pubDate: 2026-04-15
tags: ["claude-code", "入門", "使い方", "インストール"]
category: "getting-started"
difficulty: "beginner"
readingTime: 8
affiliateLinks:
  - service: "Udemy"
    url: "https://www.udemy.com/"
    label: "Claude Code・AI開発の関連コースを見る"
draft: false
---

## この記事でわかること

- Claude Code とは何か、何ができるのか
- インストールと初期設定の手順
- 基本的な使い方と最初にやるべきこと
- よくあるつまずきポイントと解決策

## Claude Code とは

**Claude Code** は Anthropic が開発した AI コーディングアシスタントです。ターミナル（コマンドライン）から直接操作でき、コードの作成・編集・デバッグ・リファクタリングをすべて自然言語で指示できます。

他の AI コーディングツールと大きく異なる点は、**ファイルシステムへの直接アクセス**と**コマンド実行能力**を持つことです。「このディレクトリのコードを読んで、バグを直して」と指示するだけで、Claude Code が自律的に作業を進めてくれます。

```bash
# こんな指示が通る
claude "src/app.ts を読んで、型エラーを修正してください"
```

実際に手元で試してみると、既存プロジェクトのコードを理解してリファクタリングを提案する精度の高さに驚きました。

## インストール方法

### 前提条件

- Node.js 18 以上（`node --version` で確認）
- npm または npx

### インストール手順

```bash
# グローバルインストール（推奨）
npm install -g @anthropic-ai/claude-code

# または npx で都度実行
npx @anthropic-ai/claude-code
```

インストール後、初回起動時に Anthropic アカウントへのログインが求められます。

```bash
claude
# → ブラウザが開き、認証画面が表示される
```

Claude Pro（$20/月）または Claude Max（$100/月）のサブスクリプションが必要です。

## 基本的な使い方

### 対話モード（推奨）

```bash
claude
```

プロンプトが表示されたら、自然言語で指示を入力します。

```
> src/components/ のファイルを一覧表示して、構造を説明してください
> package.json を読んで、依存関係の問題がないか確認してください
> README.md に日本語のセットアップ手順を追記してください
```

### ワンショットモード

特定のタスクを1回だけ実行したい場合：

```bash
claude "このディレクトリのすべての .ts ファイルに型アノテーションを追加してください"
```

### CLAUDE.md でプロジェクトを理解させる

プロジェクトルートに `CLAUDE.md` を置くと、Claude Code が自動で読み込みます。プロジェクトの概要・使用技術・コーディング規約を書いておくと、精度が大幅に向上します。

```markdown
# プロジェクト概要
Next.js 14 + TypeScript で構築した EC サイト。
コンポーネントは src/components/ に、API ルートは src/app/api/ に格納。

## コーディング規約
- TypeScript strict モード必須
- コンポーネントは React Server Components を優先
- スタイルは Tailwind CSS のみ
```

## よくあるつまずきポイント

### 「Permission denied」エラー

ツールの実行許可を求められた場合、`y` で許可するか、事前に許可リストを設定できます。

```bash
# 設定ファイルで特定コマンドを常に許可
# ~/.claude/settings.json を編集
```

### トークン制限に引っかかる

大きなコードベースを一度に処理しようとするとトークンが不足します。**タスクを分割**して、1セッションで処理する量を絞るのが有効です。

### 生成されたコードが動かない

「実際に動かして確認してください」と指示を追加すると、Claude Code がコマンド実行でテストしてくれます。

## まとめ

Claude Code は、インストールから使い始めるまでのハードルが低く、すぐに実戦投入できます。特に以下の用途で威力を発揮します：

- 既存コードのリファクタリング
- バグの原因特定と修正
- ドキュメント生成
- テストコードの追加

まずは小さなタスクから試して、徐々に任せる範囲を広げていくのがおすすめです。

## 次に読む記事

- [Claude Code のインストール方法と初期設定](/posts/claude-code-install)
- [CLAUDE.md の書き方ガイド](/posts/claude-code-claude-md)
