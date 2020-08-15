# @geolonia/github-labels

![Node.js CI](https://github.com/geolonia/github-labels/workflows/labels/badge.svg)

- GitHub Issues/Pull requests のラベルを YAML ファイルに記述して管理します
- 特定の Organization 直下の全てのリポジトリに反映されます
- 処理の実行時に既存のラベルがある場合、それは削除されません
- `aliases` フィールドでラベルのエイリアスを指定できます: 以下の例では、 `Bug` と `バグ` のラベルは `bug` のエイリアスとして扱われまとめられます

  ```yaml
  - name: bug
    aliases:
      - Bug
      - バグ
  ```

- ラベルの定義方法は https://github.com/Financial-Times/github-label-sync#label-config-file を参照してください

## 実行

```shell
$ cp .envrc.sample .envrc
$ vi .envrc
$ direnv allow
$ node src/main.mjs > result.json
```
