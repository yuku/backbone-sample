define([
  'jquery',
  'underscore',
  'backbone',
  './ListView',
  './ShowView',
  './EditView',
  './NewView',
  'jst/pc'
],
function ($, _, Backbone, ListView, ShowView, EditView, NewView, JST) {

  'use strict';

  return Backbone.View.extend({
    // The view rendered now
    mainview: null,
    events: {
      'click .new': function (e) {
        e.preventDefault();
        Backbone.history.navigate('new', true);
      }
    },
    initialize: function () {
      _.bindAll(this, 'onResize', 'fitContainers');
      this.listenTo(this.options.router, 'route', this.dispatch);
      $(window).on('resize', this.onResize);
    },
    // View methods
    // ------------
    render: function () {
      this.$el.html(JST['pc/app']());
      this.listview = new ListView({
        collection: this.collection
      });
      this.$('#contactlist').append(this.listview.render().el);
      _.defer(this.fitContainers);
      return this;
    },
    fitContainers: function () {
      var height = $(window).height();
      // Fit #contactlist
      var sidebarcontent = this.$('#sidebar-content');
      sidebarcontent.height(height - sidebarcontent.offset().top);
      // Fit #main
      var main = this.$('#main');
      main.height(height - main.offset().top);
    },
    dispatch: function (name, args) {
      if (!_.include(['index', 'show', 'edit', 'new'], name)) return;
      if (this.mainview) this.mainview.remove();
      args || (args = []);
      this.listview.select(args[0]);
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
      var model = this.collection.get(id);
      if (!model) return;
      this.mainview = new EditView({model: model});
      this.$('#main').append(this.mainview.render().el);
    },
    newContact: function () {
      var model = new this.collection.model(null, {collection: this.collection});
      this.mainview = new NewView({model: model});
      this.$('#main').append(this.mainview.render().el);
    },
    // Controller methods
    // ------------------
    onResize: function () {
      this.fitContainers();
    }
  });
});
