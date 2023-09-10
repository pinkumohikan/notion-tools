# make daybook

Notionに業務日誌 (daybook) のページを作成する小さなツール

## 使うもの
* Notion API
* Node.js
* crontab (定期実行する場合)


## 本プロダクトで解決したい課題
* Notionのテンプレートではページタイトルやプロパティに関数を使えない
    * 具体例: ページタイトルを "YYYY/MM/DD" とする
    * 具体例: `稼働開始時刻` プロパティをその日の10:00に設定する
* Notionの繰り返し設定では指定曜日のみ繰り返す設定が出来ない
    * 具体例: 火水木金だけ繰り返す
* Notionのオートメーションは繰り返し設定と併用が出来ない
    * 具体例: 繰り返し設定によってページが作成されたことをトリガーに、プロパティを設定する


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

## 定期実行の設定
例えば「火水木金の毎朝9:30にページを作成する」場合、crontabへ下記のようなエントリを設定する

```
30 9 * * 2,3,4,5 cd ~/path/to/make-daybook && make run >~/path/to/run.log 2>&1
```
