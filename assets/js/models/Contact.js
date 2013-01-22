define([
  'underscore',
  'backbone',
  'md5'
],
function (_, Backbone, md5) {

  'use strict';

  return Backbone.Model.extend({
    initialize: function () {
      this.listenTo(this, 'change:email', this.updateHash);
      if (!this.get('hash')) this.updateHash();
      if (!this.collection) throw new Error("Don't create directly");
    },
    validate: function (attrs) {
      var errors = {};
      if (!attrs.name) errors.name = 'Name is required';
      if (attrs.email) {
        if (!/[^\s@]+@\S+\.\S+/.test(attrs.email)) {
          errors.email = 'Invalid address';
        } else if (this.collection.find(function (contact) {
              return this !== contact && contact.get('email') === attrs.email;
            })) {
          errors.email = 'This address is already in use';
        }
      }
      return _.isEmpty(errors) ? null : errors;
    },
    index: function () {
      return (this.get('name') || '').charAt(0).toUpperCase();
    },
    updateHash: function () {
      var email = this.get('email') || 'dummy';
      this.set('hash', md5(email.toLowerCase()));
    }
  });
});
