define([
  'underscore',
  'backbone',
  'jst/pc'
],
function (_, Backbone, JST) {

  'use strict';

  return Backbone.View.extend({
    initialize: function () {
      this.listenTo(this.model, 'change', this.render);
    },
    render: function () {
      this.$el.html(JST['pc/show']({source: this.presenter()}));
      return this;
    },
    presenter: function () {
      return this.model.toEscapedJSON();
    }
  });
});
