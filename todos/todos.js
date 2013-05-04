/*global jQuery: false _: false Backbone: false */

(function (global) {

  "use strict";

  // DOM の読み込みが完了する前に定義する

  var $ = global.jQuery,
      _ = global._,
      Backbone = global.Backbone;

  // アプリケーションの名前空間
  // テストのために外部に公開する
  var Todos = global.Todos = {};

  var Todo = Todos.Todo = Backbone.Model.extend({
    defaults: {
      done: false
    },

    initialize: function () {
      this.on("remove", function () { this.unset("order"); }, this);
    },

    toggle: function () {
      this.save({ done: !this.get("done") });
    }
  });

  var TodoList = Todos.TodoList = Backbone.Collection.extend({
    model: Todo,

    localStorage: new Backbone.LocalStorage("todos"),

    // Modelの特定の属性値で昇順にソートする場合は名前だけでよい
    comparator: "order",

    // Todo#defaultsからTodoList#nextOrderにアクセスせずにTodoListに追加
    // されるタイミングで付与するようにする。
    // Collectionにはset, reset, push, shiftなどのメソッドが定義されているが、
    // これらは全て内部でaddを使っている。
    add: function (models) {
      if (!_.isArray(models)) models = [models];
      _.each(models, function (model) {
        if (model instanceof Todo && !model.has('order')) {
          model.set('order', this.nextOrder());
        } else if (!model.hasOwnProperty('order')) {
          model.order = this.nextOrder();
        }
      }, this);
      Backbone.Collection.prototype.add.apply(this, arguments);
    },

    // 完了しているTodoを返す
    done: function () {
      return this.where({done: true});
    },

    // 完了していないTodoを返す
    remaining: function () {
      return this.where({done: false});
    },

    nextOrder: function () {
      if (!this.length) return 1;
      return this.last().get("order") + 1;
    },

    swap: function (idA, idB) {
      var tmp, modelA, modelB;
      modelA = this.get(idA);
      modelB = this.get(idB);
      if (modelA && modelB) {
        tmp = modelA.get('order');
        modelA.save('order', modelB.get('order'), {silent: true});
        modelB.save('order', tmp, {silent: true});
        this.sort();
      }
    }
  });

  // ヘルパー関数
  // DOMセレクタを受け取って、それをUnderscoreテンプレート化したものを返す。
  // 同じセレクタの場合はキャッシュを使うので不要なDOMアクセスを抑制できる。
  var template = _.memoize(function (selector) {
    return _.template($(selector).html());
  });

  var TodoView = Todos.TodoView = Backbone.View.extend({

    tagName: "li",

    moving: false,  // ドラッグされているかどうか

    template: function (data) {
      return template("#item-template")(data);
    },

    events: {
      "click .toggle":   "toggleDone",
      "dblclick .view":  "edit",
      "click a.destroy": "clear",
      "keypress .edit":  "updateOnEnter",
      "blur .edit":      "close",

      // Todoをドラッグ・アンド・ドロップで並び替えられるようにする
      "dragstart": "onDragStart",
      "dragend": "onDragEnd",
      "drop": "onDrop",
      "dragover": "onDragOver",
    },

    initialize: function () {
      this.listenTo(this.model, "change", this.render);
      this.listenTo(this.model, "destroy", this.remove);
    },

    // ビューメソッド
    // --------------
    render: function () {
      this.$el.html(this.template(this.model.toJSON()));
      this.$el.toggleClass("done", this.model.get("done"));
      this.input = this.$(".edit");
      return this;
    },

    // コントローラメソッド
    // --------------------
    toggleDone: function () {
      this.model.toggle();
    },

    edit: function () {
      if (this.editing) return;
      this.editing = true;
      this.$el.addClass("editing");
      this.input.focus();
    },

    close: function () {
      if (!this.editing) return;
      this.editing = false;
      var value = this.input.val();
      if (!value) {
        this.clear();
      } else {
        this.model.save({ title: value });
        this.$el.removeClass("editing");
      }
    },

    updateOnEnter: function (e) {
      if (!this.editing) false;
      if (e.keyCode == 13) this.close();
    },

    clear: function () {
      this.model.destroy();
    },

    onDragStart: function (e) {
      this.moving = true;
      this.$el.addClass('moving');
      e.originalEvent.dataTransfer.setData('application/x-todo-id',
                                           this.model.id);
    },

    onDragEnd: function () {
      this.moving = false;
      this.$el.removeClass('moving');
    },

    onDrop: function (e) {
      e.preventDefault();
      // 自分自身へドロップした場合は何もしない
      if (!this.moving) {
        var id, model, tmp;
        id = e.originalEvent.dataTransfer.getData('application/x-todo-id');
        this.model.collection.swap(id, this.model.id);
      }
    },

    onDragOver: function (e) {
      // ドロップ可能にする
      e.preventDefault();
    }

  });

  var AppView = Todos.AppView = Backbone.View.extend({

    el: "#todoapp",

    template: function (data) {
      return template("#stats-template")(data);
    },

    events: {
      "keypress #new-todo": "createOnEnter",
      "click #clear-completed": "clearCompleted",
      "click #toggle-all": "toggleAllComplete"
    },

    initialize: function () {
      // もともとはグローバル変数だったTodosをcollectionプロパティに格納する。
      // これによりaddAllやclearCompletedなどのメソッド内でTodosの代わりに
      // this.collectionにアクセスするように変更できる。
      this.collection = new TodoList();

      this.input = this.$("#new-todo");
      this.allCheckbox = this.$("#toggle-all")[0];
      this.list = this.$("#todo-list");

      this.listenTo(this.collection, "add", this.addOne);
      // 本来はここにresetイベントの購読が行われているが、Backbone1.0から
      // Collection#fetchがsetをデフォルトで使うようになったので削除した。
      this.listenTo(this.collection, "all", this.render);
      this.listenTo(this.collection, "sort", this.reorder);

      this.footer = this.$("footer");
      this.main = $("#main");

      this.collection.fetch();
    },

    // ビューメソッド
    // --------------
    render: function () {
      var done = this.collection.done().length;
      var remaining = this.collection.remaining().length;

      if (this.collection.length) {
        this.main.show();
        this.footer
          .show()
          .html(this.template({ done: done, remaining: remaining }));
      } else {
        this.main.hide();
        this.footer.hide();
      }

      this.allCheckbox.checked = !remaining;
    },

    addOne: function (todo) {
      var view = new TodoView({ model: todo });
      this.list.append(view.render().el);
    },

    reorder: function () {
      this.list.html('');
      this.addAll();
    },

    // コントローラメソッド
    // --------------------
    addAll: function () {
      this.collection.each(this.addOne, this);
    },

    createOnEnter: function (e) {
      var value = this.input.val();
      if (e.keyCode !== 13) return;
      if (!value) return;

      this.collection.create({ title: value });
      // コントローラメソッド内でビューを変更しているが、これくらいは許容。
      // もっと込み入ってくるのであればclearInputメソッドを作って、それを
      // 実行するようにする。
      this.input.val("");
    },

    clearCompleted: function () {
      _.invoke(this.collection.done(), "destroy");
      return false;
    },

    toggleAllComplete: function () {
      var done = this.allCheckbox.checked;
      this.collection.each(function (todo) { todo.save({ done: done }); });
    }

  });

  $(function () {

    // DOM の準備が整ったらアプリを起動
    new AppView();

  });

})(this);
