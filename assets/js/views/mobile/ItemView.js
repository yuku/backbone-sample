define([
  'underscore',
  'backbone',
  'jst/mobile'
],
function (_, Backbone, JST) {

  'use strict';

  return Backbone.View.extend({
    tagName: 'li',
    initialize: function () {
      //this.listenTo(this.model, 'change', this.render);
      this.listenTo(this.model, 'remove', this.remove);
    },
    // View methods
    // ------------
    render: function () {
      this.$el.html(JST['mobile/item']({source: this.presenter()}));
      return this;
    },
    presenter: function () {
      return _.defaults(this.model.toSafeJSON(), {id: this.model.id});
    }
  });
});
