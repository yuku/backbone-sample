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
      if (this.mainview) this.mainview.remove();
      var model = this.collection.get(id);
      if (!model) return;
      this.mainview = new EditView({model: model});
      this.mainview.on('updated', function () {
        // navigate to show page and trigger 'route:show' event
        this.options.router.navigate(this.mainview.model.id, true);
      }, this);
      this.mainview.on('deleted', function () {
        // navigate to index page and trigger 'route:index' event
        this.options.router.navigate('', true);
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
    },
    onResize: function () {
      this.fitContainers();
    }
  });
});
