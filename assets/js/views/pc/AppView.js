define([
  'backbone',
  './ListView',
  './ShowView',
  './EditView',
  'jst'
],
function (Backbone, ListView, ShowView, EditView, JST) {

  'use strict';

  return Backbone.View.extend({
    mainview: null,

    initialize: function () {
      this.listenTo(this.options.router, 'route:show', this.showContact);
      this.listenTo(this.options.router, 'route:edit', this.editContact);
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
    },
    editContact: function (id) {
      if (this.mainview) this.mainview.remove();
      var model = this.collection.get(id);
      if (!model) return;
      this.mainview = new EditView({model: model});
      this.mainview.on('updated canceled', function () {
        // navigate to show page and trigger 'route:show' event
        this.options.router.navigate(this.mainview.model.id, true);
      }, this);
      this.$('#main').append(this.mainview.render().el);
    }
  });
});
