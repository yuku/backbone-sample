define([
  'backbone',
  './ListView',
  'jst'
],
function (Backbone, ListView, JST) {

  return Backbone.View.extend({
    initialize: function () {
    },
    render: function () {
      this.$el.html(JST['pc/app'](this.presenter()));
      this.listview = new ListView({
        collection: this.collection
      });
      this.$('#contactlist').append(this.listview.render().el);
      return this;
    },
    presenter: function () {
      return null;
    }
  });
});
