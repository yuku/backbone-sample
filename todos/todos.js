/*global jQuery: false _: false Backbone: false */

(function ($, _, Backbone) {

  "use strict";

  // DOM の読み込みが完了する前に定義する

  var Todo = Backbone.Model.extend({
    defaults: {
      done: false
    },

    initialize: function () {
      this.on("remove", function () { this.unset("order"); }, this);
    },

    // 変更なし
    toggle: function () {
      this.save({ done: !this.get("done") });
    }
  });

  var TodoList = Backbone.Collection.extend({
    model: Todo,

    localStorage: new Backbone.LocalStorage("todos"),

    //
    add: function (models) {
      _.isArray(models) || (models = [models]);
      _.each(models, function (model) {
        if (model instanceof Todo) {
          model.set('order', this.nextOrder());
        } else {
          model.order = this.nextOrder();
        }
      }, this);
      TodoList.__super__.add.apply(this, arguments);
    },

    // 変更なし
    done: function () {
      return this.filter(function (todo) { return todo.get("done"); });
    },

    // 変更なし
    remaining: function () {
      return this.reject(function (todo) { return todo.get("done"); });
    },

    // 変更なし
    nextOrder: function () {
      if (!this.length) return 1;
      return this.last().get("order") + 1;
    },

    // Modelの特定の属性値で昇順にソートする場合は名前だけでよい
    comparator: "order"
  });

  var template = _.memoize(function (selector) {
    return _.template($(selector).html());
  });

  var TodoView = Backbone.View.extend({

    tagName: "li",

    template: function (data) {
      return template("#item-template")(data);
    },

    // 変更なし
    events: {
      "click .toggle": "toggleDone",
      "dblclick .view": "edit",
      "click a.destroy": "clear",
      "keypress .edit": "updateOnEnter",
      "blur .edit": "close"
    },

    // 変更なし
    initialize: function () {
      this.listenTo(this.model, "change", this.render);
      this.listenTo(this.model, "destroy", this.remove);
    },

    // 変更なし
    render: function () {
      this.$el.html(this.template(this.model.toJSON()));
      this.$el.toggleClass("done", this.model.get("done"));
      this.input = this.$(".edit");
      return this;
    },

    // 変更なし
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

    // 変更なし
    clear: function () {
      this.model.destroy();
    }

  });

  var AppView = Backbone.View.extend({

    el: "#todoapp",

    statsTemplate: function (data) {
      return template("#stats-template")(data);
    },

    // 変更なし
    events: {
      "keypress #new-todo": "createOnEnter",
      "click #clear-completed": "clearCompleted",
      "click #toggle-all": "toggleAllComplete"
    },

    initialize: function () {
      this.collection = new TodoList();

      this.input = this.$("#new-todo");
      this.allCheckbox = this.$("#toggle-all")[0];

      this.listenTo(this.collection, "add", this.addOne);
      this.listenTo(this.collection, "reset", this.addAll);
      this.listenTo(this.collection, "all", this.render);

      this.footer = this.$("footer");
      this.main = $("#main");

      this.collection.fetch();
    },

    // Todos を this.collection に変更
    render: function () {
      var done = this.collection.done().length;
      var remaining = this.collection.remaining().length;

      if (this.collection.length) {
        this.main.show();
        this.footer
          .show()
          .html(this.statsTemplate({ done: done, remaining: remaining }));
      } else {
        this.main.hide();
        this.footer.hide();
      }

      this.allCheckbox.checked = !remaining;
    },

    // 変更なし
    addOne: function (todo) {
      var view = new TodoView({ model: todo });
      this.$("#todo-list").append(view.render().el);
    },

    // Todos を this.collection に変更
    addAll: function () {
      this.collection.each(this.addOne, this);
    },

    createOnEnter: function (e) {
      var value = this.input.val();  // キャッシュ
      if (e.keyCode !== 13) return;
      if (!value) return;

      this.collection.create({ title: value });
      this.input.val("");
    },

    // Todos を this.collection に変更
    clearCompleted: function () {
      _.invoke(this.collection.done(), "destroy");
      return false;
    },

    // Todos を this.collection に変更
    toggleAllComplete: function () {
      var done = this.allCheckbox.checked;
      this.collection.each(function (todo) { todo.save({ done: done }); });
    }

  });

  $(function () {

    // DOM の準備が整ったらアプリを起動
    new AppView();

  });

})(jQuery, _, Backbone);
