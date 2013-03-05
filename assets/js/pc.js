require([
  'jquery',
  'backbone',
  'collections/ContactList',
  'views/pc/AppView',
  'routers/pc',
  'fixtures'
],
function ($, Backbone, ContactList, AppView, Router, fixtures) {

  'use strict';

  var router = new Router();

  var contactlist = new ContactList();
  contactlist.fetch({
    success: function () {
      if (contactlist.isEmpty()) {
        contactlist.reset(fixtures).invoke('save');
      }
    }
  });

  var appview = new AppView({
    router: router,
    collection: contactlist
  });

  $(function () {
    $('body').append(appview.render().el);
    Backbone.history.start({root: '/backbone-sample'});
  });
});
