define([
  'backbone',
  './ListView',
  './ShowView',
  'jst'
],
function (Backbone, ListView, ShowView, JST) {

  'use strict';

  return Backbone.View.extend({
    mainview: null,

    initialize: function () {
      this.listenTo(this.options.router, 'route:show', this.showContact);
    },
    // View methods
    // ------------
    render: function () {
      this.$el.html(JST['pc/app']());
      this.listview = new ListView({
        collection: this.collection
      });
      this.$('#contactlist').append(this.listview.render().el);
      return this;
    },
    // Controller methods
    // ------------------
    showContact: function (id) {
      if (this.mainview) this.mainview.remove();
      var model = this.collection.get(id);
      if (!model) return;
      this.mainview = new ShowView({model: model});
      this.$('#main').append(this.mainview.render().el);
    }
  });
});
