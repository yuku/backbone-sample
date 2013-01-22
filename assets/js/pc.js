define([
  'backbone',
  'routers/pc',
  'collections/ContactList'
],
function (Backbone, Router, ContactList) {

  'use strict';

  var app = {
    root: '/contacts',
    contactlist: new ContactList([
      {name: 'Yuku Takahashi', email: 'taka84u9@gmail.com'},
      {name: 'Yuku Takahashi', email: 'ytakahas@gmail.com'}
    ])
  };
  //app.contact_list.fetch();

  new Router({app: app});

  Backbone.history.start({root: app.root});
});
