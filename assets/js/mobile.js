require([
  'jquery',
  'jquery.mobile',
  'backbone',
  'routers/mobile',
  'collections/ContactList',
  'fixtures'
],
function ($, mobile, Backbone, Router, ContactList, fixtures) {

  'use strict';

  var contactlist = new ContactList();
  contactlist.fetch();
  if (contactlist.size() === 0) {
    contactlist.update(fixtures);
    contactlist.invoke('save');
  }

  new Router({collection: contactlist});

  $(function () {
    Backbone.history.start({root: '/backbone-sample'});
  });
});
