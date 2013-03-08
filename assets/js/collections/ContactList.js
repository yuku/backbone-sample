define([
  'backbone',
  'backbone.localStorage',
  'models/Contact'
],
function (Backbone, LocalStorage, Contact) {

  'use strict';

  // Singleton
  var instance;

  var ContactList = Backbone.Collection.extend({
    model: Contact,
    localStorage: new LocalStorage('contact'),
    comparator: function (contact) { return contact.index(); },
    constructor: function () {
      if (!instance) {
        instance = this;
        Backbone.Collection.apply(instance, arguments);
      }
      return instance;
    }
  });

  return ContactList;
});
