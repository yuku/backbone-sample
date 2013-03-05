define([
  'underscore',
  'backbone',
  'jst/mobile'
],
function (_, Backbone, JST) {

  'use strict';

  return Backbone.View.extend({
    tagName: 'li',
    events: {
      'click a': function (e) {
        e.preventDefault();
        Backbone.history.navigate(this.model.id, true);
      }
    },
    // View methods
    // ------------
    render: function () {
      this.$el.html(JST['mobile/item']({source: this.presenter()}));
      return this;
    },
    presenter: function () {
      return _.defaults(this.model.toEscapedJSON(), {id: this.model.id});
    }
  });
});
