define([
  'underscore',
  'backbone',
  'jst'
],
function (_, Backbone, JST) {

  'use strict';

  return Backbone.View.extend({
    initialize: function () {
      this.listenTo(this.model, 'change', this.render);
    },
    render: function () {
      this.$el.html(JST['pc/show'](this.presenter()));
      return this;
    },
    presenter: function () {
      return _.defaults(this.model.toSafeJSON(), {
        id: this.model.cid,
        phone: '',
        email: ''
      });
    }
  });
});
