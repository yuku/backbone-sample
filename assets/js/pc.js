require([
  'jquery',
  'backbone',
  'routers/pc',
  'collections/ContactList',
  'fixtures'
],
function ($, Backbone, Router, ContactList, fixtures) {

  'use strict';

  var app = {
    root: '/backbone-sample',
    contactlist: new ContactList()
  };
  app.contactlist.fetch();
  if (app.contactlist.size() === 0) {
    app.contactlist.update(fixtures);
    app.contactlist.invoke('save');
  }

  new Router({app: app});

  $(function () {
    Backbone.history.start({root: app.root});
  });
});
