<toc-element></toc-element>

Polymer/iron-* 要素は、ユーティリティ要素（ビジュアルな要素とそれ以外の要素とがある）がセットになったものです。この中には、レイアウトやユーザー入力、選択に作用する要素、土台となるアプリに作用する要素が含まれています。
これらの要素を使うには、まず、Bower を使って要素をインストールする必要があります。

<aside class="callout">
  <b>Bower とは？</b>
  <p><a href="http://bower.io/">Bower</a>は、クライアント側のパッケージ管理ツールで、どんなウェブ アプリでも使用することができ、面倒な依存関係を管理してくれます。Polymer コンポーネントはすべて、自身の依存関係を定義しています。Bower を使って Polymer コンポーネントをインストールすると、コンポーネントとその依存関係が <code>bower_components/</code> の中にインストールされます。
</p>
</aside>

### iron-* 要素をインストールする

プロジェクトの `bower_components` ディレクトリを見てみると、たくさんの `paper-*` コンポーネントがすでにプリインストールされていることが分かります。この codelab では、`iron-*` と `paper-*` の両方の要素を使ってアプリを作成していきます。

通常は、`bower install Polymer/iron-elements --save` をコマンドライン上で実行して全要素を一括インストールしますが、Chrome Dev Editor には Bower コマンドを実行するコマンドラインがありません。代わりに、手動で `bower.json` を編集して `iron-elements` を追加したのち、Chrome Dev Editor の Bower Update 機能を使ってペーパー要素を `bower_components/` にダウンロードします。

<span style="font-size:18px;color:red;background:#ffddaa">※ 現在のテンプレートには、既に `iron-elements` と `paper-elements` が含まれているため、編集の必要はありません。また、プロジェクトを作成すると自動で <code>bower install<code> が実行されるため、タスクが失敗した場合にのみドロップダウンから ` Bower Update` を実行してください。</span>

&rarr; `bower.json` を編集し、`dependencies` に `iron-elements` を追加します。

    "dependencies": {
      ...
      "iron-elements": "Polymer/iron-elements"
    }

<div class="stepbystep">
  <ul>
    <li>エディターにて、ファイル名 `bower.json` を右クリックします。</li>
    <li>ドロップダウンから <b>Bower Update</b>（Bower 更新）を実行します。</li>
  </ul>
  <div>
    <img src="img/s2-bowerupdate.png" style="height:200px;">
  </div>
</div>

### Roboto フォントをインストールする

同様に、Bower を使って Roboto フォントをインストールします。

<span style="font-size:18px;color:red;background:#ffddaa">※ Roboto フォントは、`paper-elements` との依存関係から既に含まれているため、新たに追加する必要はありません。 `bower_components/font-roboto/roboto.html` が存在することを確認してください。</span>

&rarr; `bower.json` を編集し、`dependencies` に `font-roboto` を追加します。

    "dependencies": {
      ...
      "font-roboto": "Polymer/font-roboto"
    }

&rarr; エディターにて、ファイル名 `bower.json` を右クリックし、ドロップダウンから **Bower Update** を実行します。

### アプリのルート要素を作成する

Polymer の世界では、すべてが要素となります。したがってアプリも要素です。

アプリのルート要素を作成するには、以下の手順を実施する必要があります。

1. `codelab-app.html` ファイルを新規作成する
2. そのファイルにて要素用の基本的なマークアップを作成する
3. HTML Import を使ってファイルを `index.html` にロードする
4. ページ上で要素のインスタンスを宣言する

<div class="stepbystep">
  <ul>
    <li>Chrome Dev Editor のサイドバーにて、**PolymerMobileCodelab > New File...** を右クリックし、`codelab-app.html` という名称でファイルを新規作成します。</li>
  </ul>
  <div>
    <img src="img/s2-newfile.png" style="height:250px;">
  </div>
</div>

&rarr; `codelab-app.html` にて、Polymer 要素用の基本的なマークアップを貼り付けます。

    <link rel="import" href="bower_components/polymer/polymer.html">
    <link rel="import" href="bower_components/font-roboto/roboto.html">

    <dom-module id="codelab-app">
      <template>
        <link rel="stylesheet" href="styles.css">
        Hello Polymer!
      </template>
      <script>
        Polymer({
          is: 'codelab-app'
        });
      </script>
    </dom-module>

Roboto2 フォントのインポートは必須ではありませんが、これがあれば、今回のアプリで Roboto フォントを使用することができます。

&rarr; `styles.css` を開いて、その中身を以下の CSS ルールで置き換えます。

    :host {
      font-family: RobotoDraft, 'Helvetica Neue', Helvetica, Arial;
    }

この CSS ファイルは、今回の `codelab-app` 要素のテンプレートの内部で参照されるものです。このファイルにあるルールは、ルート要素内にある要素に適用されます。Web Components で導入される 特殊な CSS セレクター [`:host`](http://www.html5rocks.com/en/tutorials/webcomponents/shadowdom-201/#toc-style-host) は、ルート要素そのもののスタイルを設定します。

<aside class="callout">
  <b>スタイルのカプセル化</b>
  <p>Web Components の基本的特徴の 1 つがカプセル化です。
  Shadow DOM は [shadow boundary（shadow の境界）](http://w3c.github.io/webcomponents/spec/shadow/#shadow-trees) を守ります。
  Shadow DOM の内部に定義されている CSS スタイルは、ShadowRoot にスコープ されます。つまり、デフォルトで、スタイルはカプセル化されているという意味です。
  </p>
</aside>


&rarr; `index.html` にて、`<head>` の中身を削除し、`codelab-app.html` をロードする [HTML Import](http://www.polymer-project.org/platform/html-imports.html) を追加します。`<head>` は以下のようになります。

**重要**: HTML Import が `webcomponents-lite.js` の後にくるようにしてください。

    <head>
      <title>PolymerMobileCodelab</title>

      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
      <meta name="mobile-web-app-capable" content="yes">
      <meta name="apple-mobile-web-app-capable" content="yes">

      <script src="bower_components/webcomponentsjs/webcomponents-lite.js"></script>

      <link rel="import" href="codelab-app.html">
    </head>

&rarr; `<body>` の中身を削除して、代わりに `<codelab-app>` を宣言します。

    <body>
      <codelab-app></codelab-app>
    </body>


### アプリを実行する

&rarr; Chrome Dev Editor にて **index.html** ファイルを選択し、<img src="img/runbutton.png" class="icon"> ボタンをクリックします。すると、`codelab-app` の **Hello Polymer** がページ上に表示されます。

うまくいかない場合は、以下のフォルダにあるファイルと自分のコードとを照らし合わせてみてください。

-   [`Github`](https://github.com/pikotea/its-hackademic/tree/master/static/codelabs/ja/3-polymer-build-mobile/PolymerMobileCodelab/step-2)

### まとめ

このステップで学んだ内容:

- Bower を使って `iron-*` 要素をインストールする
- ルート要素を作成し、それをページ上で宣言的に使用する
- CSS を使ってホスト要素のスタイルを設定する

## 次のステップ

今の時点ではアプリはまだ何もできません。レイアウトを追加しましょう！
