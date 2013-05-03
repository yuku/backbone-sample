「Backbone.jsガイドブック」サンプルコード
=========================================

このリポジトリは [Backbone.jsガイドブック](http://www.amazon.co.jp/gp/product/4899773501/ref=as_li_ss_tl?ie=UTF8&camp=247&creative=7399&creativeASIN=4899773501&linkCode=as2&tag=yuku-22) の第3章および第7章のサンプルコードを収録しています。

サンプルコード＆サンプルアプリケーション
----------------------------------------

### 3章

もともとのTodos

- [code](https://github.com/documentcloud/backbone/tree/master/examples/todos)
- [app](http://backbonejs.org/examples/todos/) - ブラウザアプリケーション

リファクタリング後

- [code](https://github.com/taka84u9/backbone-sample/tree/gh-pages/todos)
- [app](http://taka84u9.github.io/backbone-sample/todos/index.html) - ブラウザアプリケーション

### 7章

アプリケーション「Contacts」

- [pc](http://taka84u9.github.io/backbone-sample/pc.html) - ブラウザアプリケーション
- [mobile](http://taka84u9.github.io/backbone-sample/mobile.html) - jQuery Mobile を使ったモバイルアプリ

テスト

- [QUnit](http://taka84u9.github.io/backbone-sample/test/qunit/index.html)
- [Jasmine](http://taka84u9.github.io/backbone-sample/test/jasmine/index.html)

ローカルマシンで動かす
----------------------

1. Git, npm のインストール
   
2. Gitリポジトリをローカルマシンにクローンする

   ```
   % git clone git://github.com/taka84u9/backbone-sample.git
   % git submodule update --init
   ```

3. npmモジュールのインストール

   ```
   % npm install 
   ```

   合わせてgrunt-cliもインストールします

   ```
   % npm install -g grunt-cli
   ```

4. 開発サーバの起動

   デフォルトのGruntタスクを実行します。

   ```
   % grunt
   Running "connect:server" (connect) task
   Starting connect web server on localhost:8000.

   Running "watch" task
   Waiting...
   ```

   この状態でブラウザから [http://localhost:8000/backbone-sample](http://localhost:8000/backbone-sample) にアクセスします。
   このとき`connect`タスクと`watch`タスクが同時に起動されます。
   `watch`タスクによりJSTファイルとLESSファイルが変更されると自動的にコンパイルされます。

5. ブラウザでテストを実行する

   開発サーバを立ち上げた状態で [http://localhost:8000/backbone-sample/test/qunit](http://localhost:8000/backbone-sample/test/qunit) もしくは [http://localhost:8000/backbone-sample/test/jasmine](http://localhost:8000/backbone-sample/test/jasmine) にアクセスします。

6. PhantomJSでテストを実行する

   `test:qunit`と`test:jasmine`の２つのタスクが定義されています。

   ```
   % grunt test:qunit
   % grunt test:jasmine
   ```

7. ビルドする

   ```
   % grunt build
   ```

   JavaScriptとCSSをビルドします。

ライセンス
----------

MIT ライセンス
