define([
  'underscore',
  'backbone',
  'backbone.localStorage',
  'md5'
],
function (_, Backbone, LocalStorage, md5) {

  'use strict';

  return Backbone.Model.extend({
    localStorage: new LocalStorage('contact'),
    initialize: function () {
      this.listenTo(this, 'change:email', this.updateHash);
      if (!this.collection) throw new Error("Don't create directly");
    },
    validate: function (attrs) {
      var errors = {};
      if (!attrs.name) errors.name = 'Name is required';
      if (attrs.email) {
        if (!/[^\s@]+@\S+\.\S+/.test(attrs.email)) {
          errors.email = 'Invalid address';
        }
      }
      return _.isEmpty(errors) ? null : errors;
    },
    index: function () {
      return (this.get('name') || '').charAt(0).toUpperCase();
    },
    updateHash: function () {
      this.set('hash', md5(this.get('email')));
    }
  });
});
