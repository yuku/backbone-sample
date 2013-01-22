define([
  'backbone',
  './ItemView'
],
function (Backbone, ItemView) {

  'use strict';

  return Backbone.View.extend({
    tagName: 'ul',
    className: 'unstyled',
    initialize: function () {
      this.count = 0;  // the number of child itemviews
      this.listenTo(this.collection, 'add', this.append);
      this.listenTo(this.collection, 'remove', function () { this.count--; });
    },
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
      } else if (this.count === index) {
        this.$el.append(item_view.el);
      } else {
        item_view.$el.insertBefore(this.$el.children()[index]);
      }
      this.count++;
    }
  });
});
