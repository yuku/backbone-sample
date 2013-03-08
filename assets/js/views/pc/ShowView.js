define([
  'underscore',
  'backbone',
  'jst/pc'
],
function (_, Backbone, JST) {

  'use strict';

  return Backbone.View.extend({
    events: {
      'click .edit': function (e) {
        e.preventDefault(); 
        Backbone.history.navigate(this.model.id + '/edit', true);
      }
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
