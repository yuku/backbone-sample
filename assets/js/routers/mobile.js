define([
  'jquery.mobile',
  'backbone',
  'models/Contact',
  'views/mobile/IndexPage',
  'views/mobile/NewPage'
],
function (mobile, Backbone, Contact, IndexPage, NewPage) {

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
    }
  });
});
