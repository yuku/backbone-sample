define([
  'models/Contact'
],
function (Contact) {

  'use strict';

  var contact;

  module('Contact', {
    setup: function () {
      contact = new Contact();
    }
  });

  test('#validate', 3, function () {
    contact.set({
      name: '',
      email: 'abc'
    }, {validate: true});
    var errors = contact.validationError;
    ok(errors);

    equal(errors.name, 'Name is required');
    equal(errors.email, 'Invalid address');
  });

  test('#index returns the capitalized first character', function () {
    contact.set('name', 'abc');
    equal(contact.index(), 'A');
  });

  test('#index returns the first character for non-ascii name', function () {
    contact.set('name', 'あいう');
    equal(contact.index(), 'あ');
  });

  test('#updateHash is a change:email event handler', 1, function () {
    this.spy(Contact.prototype, 'updateHash');
    contact = new Contact();
    contact.set('email', 'whoami@sample.com');
    ok(contact.updateHash.calledOnce);
  });

  test('#updateHash updates a hash attr', 1, function () {
    var prev = contact.get('hash');
    contact.set('email', 'whoami@sample.com');
    notEqual(contact.get('hash'), prev);
  });
});
