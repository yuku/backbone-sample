define([
  'jquery',
  'backbone',
  './ItemView'
],
function ($, Backbone, ItemView) {

  'use strict';

  return Backbone.View.extend({
    tagName: 'ul',
    initialize: function () {
      this.listenTo(this.collection, 'add', this.append);
    },
    // View methods
    // ------------
    render: function () {
      this.collection.each(function (model) {
        this.append(model);
      }, this);
      return this;
    },
    append: function (model) {
      var item_view = (new ItemView({model: model})).render();

      var index = this.collection.indexOf(model);
      if (index === 0) {
        this.$el.prepend(item_view.el);
      } else {
        item_view.$el.insertAfter(this.$el.children()[index-1]);
      }
    },
    select: function (id) {
      var model = this.collection.get(id);
      this.$('.selected').removeClass('selected');
      if (model) {
        var index = this.collection.indexOf(model);
        $(this.$el.children()[index]).addClass('selected');
      }
    }
  });
});
