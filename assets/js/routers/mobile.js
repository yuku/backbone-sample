define([
  'jquery.mobile',
  'backbone',
  'models/Contact',
  'views/mobile/IndexPage',
  'views/mobile/NewPage',
  'views/mobile/ShowPage',
  'views/mobile/EditPage'
],
function (mobile, Backbone, Contact, IndexPage, NewPage, ShowPage, EditPage) {

  'use strict';

  var firstpage = true;

  return Backbone.Router.extend({
    routes: {
      '': 'index',
      ':id': 'new_or_show',
      ':id/edit': 'edit'
    },
    initialize: function (options) {
      this.app = options.app;
    },
    new_or_show: function (id) {
      if (id === 'new') {
        this["new"]();
      } else {
        this.show(id);
      }
    },
    index: function () {
      var page = new IndexPage({collection: this.app.contactlist});
      page.show({firstpage: firstpage});
      firstpage = false;
    },
    'new': function () {
      var page = new NewPage({
        model: new Contact(),
        collection: this.app.contactlist
      });
      page.show({firstpage: firstpage});
      firstpage = false;
      page.on('created', function () {
        this.navigate(page.model.id, true);
      }, this);
    },
    show: function (id) {
      var model = this.app.contactlist.get(id);
      if (!model) return;
      var page = new ShowPage({model: model});
      page.show({firstpage: firstpage});
      firstpage = false;
    },
    edit: function (id) {
      if (firstpage) this.navigate(id, {trigger: true, replace: true});
      var model = this.app.contactlist.get(id);
      if (!model) return;
      var page = new EditPage({model: model});
      page.show();
      page.on('updated', function () {
        this.navigate(page.model.id, true);
      }, this);
      page.on('deleted', function () {
        this.navigate('', true);
      }, this);
    }
  });
});
