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
      var data = _.defaults(this.model.toJSON(), {
        id: this.model.cid,
        phone: '',
        email: ''
      });
      _.each(data, function (value, name) {
        data[name] = _.escape(value);
      });
      return data;
    }
  });
});
