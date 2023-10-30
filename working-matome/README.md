# working matome

Notion上の業務日誌 (daybook) から月間稼働時間を求めるツール

## 使うもの
* Notion API
* Node.js


## 本プロダクトで解決したい課題
* Notion上の業務日誌 (daybook) から月間稼働時間を求めたい
    * Notionの組み込み機能では、「日単位」の稼働時間(稼働終了 - 稼働開始 - 休憩) は計算できるが月間のそれが求められない


## セットアップ
### (1) Notion APIトークンの発行 (Notionアプリの作成)
https://www.notion.so/my-integrations

### (2) ページを追加したいデータベースにNoitonアプリを連携
右上 `…` の `コネクト` から

### (3) 依存ライブラリのインストール
```
make setup
```

### (4) 実行
```
$ export NOTION_API_TOKEN=secret_...
$ export NOTION_DAYBOOK_DB_ID=3d812...

$ make run
```

* NOTION_API_TOKEN
    * Notion API (Integration) を作ったときに払い出された `secret_` から始まる文字列
* NOTION_DAYBOOK_DB_ID
    * `https://www.notion.so/pinkumohikan/aaaaaaaaaaaaaaaa` でいう `aaaaaaaaaaaaaaaa` の部分
