<toc-element></toc-element>

アプリが状態を記憶できるようにしましょう。幸いなことに、Polymer で永続レイヤーを追加するのはとても簡単です。

### タスクをローカル ストレージに保存する

タスクをローカル ストレージに保存する方法:

1. `iron-localstorage`（非 UI）要素を追加する
2. `data` が変更されるたびにタスク リストを保存する


&rarr; `codelab-app.html`にて、`iron-localstorage` 依存関係をインストールし、`iron-localstorage` 要素を `<template>` の最後、`<paper-drawer-panel>` の後に追加します。ID を **storage** にして、その値を変数 `data` にバインドします。

    ...
    <link rel="import" href="bower_components/iron-localstorage/iron-localstorage.html">
    ...
    <template>
      ...
      </paper-drawer-panel>

      <iron-localstorage id="storage" 
        name="codelab-app-storage"
        value="{{data}}"
        on-iron-localstorage-load-empty="initData">
      </iron-localstorage>
    </template>



&rarr; `dataChanged` コールバックを要素のプロトタイプに追加します。このコールバックにて、ID を基にストレージ要素を検索し、その `save` メソッドを使ってデータをローカル ストレージに保存するようにします。`on-iron-localstorage-load-empty` は、ローカルストレージに値がなかった場合の初期値を設定するためのハンドラを登録します。

    <script>
      Polymer({
        ...
        properties: {
          data: {
            ...
            // value: [],  ←値の初期化は initData() で行うため削除します
            observer: 'dataChanged'
          }
        },
        ...
        initData: function() {
          this.data = [];
        },
        dataChanged: function() {
          this.$.storage.save();
        }
      });
    </script>

`dataChanged` コールバックは、_変更ウォッチャー_です。
`data` プロパティが変更されるたびに、自動的にコールされます（例えば、新しいメモが `data` 配列に追加された場合など）。よって、ユーザーが新しいメモを追加すると、メモは自動的にローカル ストレージに保存されます。

<aside class="callout">
  <b>プロパティの監視</b>
  <p>要素のプロトタイプのプロパティ変化を監視するのに、変更ウォッチャーを使用することができます。`properties` で変数に `observer` でハンドラーを登録することで、Polymer 要素のすべてのプロパティに対して変更を監視することができます。監視対象のプロパティの値が変わると、該当する変更ハンドラーが自動的に起動します。</p>
</aside>

&rarr; `on-change` リスナーを `<paper-checkbox>` に追加し、これを `dataChanged` コールバックにバインドします。
これで、ユーザーがチェック ボックスにチェックを入れたときに `dataChanged` コールバックが起動し、メモのステータスの新しい値がローカル ストレージに保存されるようになります。

    <paper-checkbox checked="{{item.done}}" on-change="dataChanged"></paper-checkbox>


&rarr; `index.html` を開き、<img src="img/runbutton.png" class="icon"> ボタンでアプリのプレビューを表示します。
メモを追加して、チェックを入れたり外したりして、ページをリロードします。ページのリロードをしても、状態は変わらないはずです。

<figure>
  <img src="img/s6-preview.png">
  <figcaption>`<iron-localstorage>` でメモを保存</figcaption>
</figure>

### まとめ

このステップで学んだ内容:

- `iron-localstorage` を使ってアプリの状態をローカル ストレージに保存する

## 次のステップ

サイドバーが空白のままですので、さらに要素を追加しましょう ！
