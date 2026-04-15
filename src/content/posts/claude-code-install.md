---
title: "Claude Code インストール方法と初期設定【Windows・Mac対応】"
description: "Claude Codeのインストール手順を画面ごとに解説。Node.jsのセットアップからClaude Codeの認証まで、初めての方でも迷わず設定できます。"
pubDate: 2026-04-15
tags: ["claude-code", "インストール", "初期設定", "環境構築"]
category: "getting-started"
difficulty: "beginner"
readingTime: 6
affiliateLinks:
  - service: "Udemy"
    url: "https://www.udemy.com/"
    label: "AI開発・Claude Code関連コースを見る"
draft: false
---

## この記事でわかること

- Claude Code の動作要件と事前準備
- Windows・Mac 別のインストール手順
- 初回認証と動作確認の方法
- インストール後に最初にやること

## 動作要件

Claude Code を使うには以下が必要です。

| 項目 | 要件 |
|------|------|
| Node.js | バージョン 18 以上 |
| OS | Windows 10/11、macOS 12+、Linux |
| Claude アカウント | Pro（$20/月）または Max（$100/月）|
| ネット接続 | 常時接続が必要 |

## Node.js のインストール

### Windows の場合

1. [Node.js 公式サイト](https://nodejs.org/)から LTS 版をダウンロード
2. インストーラーを実行（デフォルト設定でOK）
3. コマンドプロンプトを再起動して確認：

```bash
node --version
# v20.x.x と表示されれば OK
npm --version
# 10.x.x と表示されれば OK
```

### Mac の場合

Homebrew を使うのが最もシンプルです：

```bash
# Homebrew 未インストールの場合
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Node.js をインストール
brew install node

# バージョン確認
node --version
```

## Claude Code のインストール

Node.js の準備ができたら、Claude Code をインストールします。

```bash
npm install -g @anthropic-ai/claude-code
```

インストールが完了したら確認します：

```bash
claude --version
# Claude Code のバージョンが表示されれば成功
```

## 初回認証

初めて `claude` コマンドを実行すると、ブラウザで認証を求められます。

```bash
claude
```

```
Welcome to Claude Code!
Opening browser for authentication...
```

ブラウザが開いたら：

1. Anthropic アカウントにログイン（未作成の場合は新規登録）
2. Claude Pro または Max のサブスクリプションを確認
3. Claude Code のアクセスを許可

認証が完了するとターミナルに戻り、プロンプトが表示されます。

実際に試したところ、認証は30秒ほどで完了しました。ブラウザが自動で開かない場合は、表示された URL を手動でコピーしてアクセスしてください。

## 動作確認

認証後、簡単なタスクを試してみましょう：

```bash
# 現在のディレクトリの情報を聞いてみる
claude "このディレクトリにはどんなファイルがありますか？"
```

Claude Code がファイル一覧を読み取って回答してくれれば成功です。

## インストール後の推奨設定

### プロジェクトに CLAUDE.md を置く

プロジェクトのルートディレクトリに `CLAUDE.md` を作成することで、
Claude Code がプロジェクトの文脈を理解して動作します。

```bash
# プロジェクトディレクトリに移動
cd ~/your-project/

# CLAUDE.md を作成
claude "このプロジェクトの概要を分析して CLAUDE.md を作成してください"
```

### グローバル設定ファイル

よく使うツールの許可設定は `~/.claude/settings.json` で管理できます。
初期段階では変更不要ですが、使い込むうちに調整していきましょう。

## まとめ

Claude Code のインストールは以下の3ステップで完了します：

1. Node.js 18+ をインストール
2. `npm install -g @anthropic-ai/claude-code` を実行
3. `claude` コマンドでブラウザ認証

次は実際のプロジェクトで使い始めてみましょう。最初は小さなタスクから試してみることをおすすめします。

## 次に読む記事

- [Claude Code 使い方 完全ガイド](/posts/getting-started-claude-code)
- [Claude Code を日本語で使うコツ](/posts/claude-code-japanese)
