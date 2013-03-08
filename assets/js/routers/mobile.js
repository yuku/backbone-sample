define([
  'backbone',
  'views/mobile/IndexPage',
  'views/mobile/NewPage',
  'views/mobile/ShowPage',
  'views/mobile/EditPage'
],
function (Backbone, IndexPage, NewPage, ShowPage, EditPage) {

  'use strict';

  var firstpage = true;

  return Backbone.Router.extend({
    routes: {
      '': 'index',
      ':id': 'new_or_show',
      ':id/edit': 'edit'
    },
    initialize: function (options) {
      this.collection = options.collection;
    },
    new_or_show: function (id) {
      if (id === 'new') {
        this["new"]();
      } else {
        this.show(id);
      }
    },
    index: function () {
      var page = new IndexPage({collection: this.collection});
      page.show();
      firstpage = false;
    },
    'new': function () {
      var model = new this.collection.model(null, {collection: this.collection});
      var page = new NewPage({model: model});
      page.show();
      firstpage = false;
    },
    show: function (id) {
      var model = this.collection.get(id);
      if (!model) this.navigate('', true);
      var page = new ShowPage({model: model});
      page.show();
      firstpage = false;
    },
    edit: function (id) {
      if (firstpage) {
        this.navigate(id, {trigger: true, replace: true});
        return;
      }
      var model = this.collection.get(id);
      if (!model) this.navigate('', true);
      var page = new EditPage({model: model});
      page.show();
    }
  });
});
