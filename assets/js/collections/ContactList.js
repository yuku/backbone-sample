define([
  'backbone',
  'models/Contact'
],
function (Backbone, Contact) {

  'use strict';

  return Backbone.Collection.extend({
    model: Contact,
    comparator: function (contact) { return contact.index(); }
  });
});
