define([
  'underscore',
  'backbone',
  'jst'
],
function (_, Backbone, JST) {

  'use strict';

  return Backbone.View.extend({
    tagName: 'li',
    initialize: function () {
      this.listenTo(this.model, 'change', this.render);
      this.listenTo(this.model, 'remove', this.remove);
    },
    render: function () {
      this.$el.html(JST['pc/item'](this.presenter()));
      return this;
    },
    presenter: function () {
      var data = _.defaults(this.model.toJSON(), {
        id: this.model.id,
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
