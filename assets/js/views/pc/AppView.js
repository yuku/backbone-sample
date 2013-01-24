define([
  'backbone',
  './ListView',
  './ShowView',
  './EditView',
  './NewView',
  'jst'
],
function (Backbone, ListView, ShowView, EditView, NewView, JST) {

  'use strict';

  return Backbone.View.extend({
    // The view rendered now
    mainview: null,
    events: {
      'click .new': 'navigateToNew'
    },
    initialize: function () {
      this.listenTo(this.options.router, 'route', this.dispatch);
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
    dispatch: function (name, args) {
      if (!_.include(['index', 'show', 'edit', 'new'], name)) return;
      if (this.mainview) this.mainview.remove();
      switch (name) {
        case 'show':
          this.showContact.apply(this, args);
          break;
        case 'edit':
          this.editContact.apply(this, args);
          break;
        case 'new':
          this.newContact.apply(this, args);
          break;
      }
    },
    showContact: function (id) {
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
      this.mainview.on('updated', function () {
        // navigate to show page and trigger 'route:show' event
        this.options.router.navigate(this.mainview.model.id, true);
      }, this);
      this.$('#main').append(this.mainview.render().el);
    },
    newContact: function () {
      if (this.mainview) this.mainview.remove();
      var model =
          new this.collection.model(null, {collection: this.collection});
      this.mainview = new NewView({model: model});
      this.mainview.on('created', function () {
        // navigate to show page and trigger 'route:show' event
        this.options.router.navigate(this.mainview.model.id, true);
      }, this);
      this.$('#main').append(this.mainview.render().el);
    },
    // Controller methods
    // ------------------
    navigateToNew: function (e) {
      e.preventDefault();
      this.options.router.navigate('new', true);
    }
  });
});
