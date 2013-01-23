define([
  'models/Contact',
  'collections/ContactList'
],
function (Contact, ContactList) {

  'use strict';

  var contact, contact_list;

  module('Contact', {
    setup: function () {
      contact_list = new ContactList();
      contact = contact_list.create();
    }
  });

  test('#initialize', 1, function () {
    throws(function () { new Contact(); }, Error,
      'It throws an error if constructor called directly');
  });

  test('#validate', 4, function () {
    contact.set({
      name: '',
      email: 'abc'
    }, {validate: true});
    var errors = contact.validationError || {};

    equal(errors.name, 'Name is required', 'It requires name attr');
    equal(errors.email, 'Invalid address', 'It checks email attr\'s format');

    contact.set('email', 'abc@sample.com');

    var other = contact_list.create();
    other.set('email', contact.get('email'), {validate: true});
    errors = other.validationError || {};
    equal(errors.email, 'This address is already in use',
      'It checks unique constraint on email attr');

    contact.set({}, {validate: true});
    errors = contact.validationError || {};
    equal(errors.email, undefined,
      'It doesn\'t check unique constraint against `this`');
  });

  test('#index', 3, function () {
    equal(contact.index(), '',
      'It returns an empty character by default');

    contact.set('name', 'abc');
    equal(contact.index(), 'A',
      'It returns the capitalized first character');

    contact.set('name', 'あいう');
    equal(contact.index(), 'あ',
      'It returns the first character for non-ascii name');
  });

  test('#updateHash', 2, function () {
    this.spy(Contact.prototype, 'updateHash');
    contact = contact_list.create();
    var previous = contact.get('hash');
    var prevCount = contact.updateHash.callCount;
    contact.set('email', 'whoami@sample.com');
    equal(contact.updateHash.callCount - prevCount, 1,
      'It is change:email event handler');
    notEqual(contact.get('hash'), previous,
      'It updates hash attr');
  });

  test('#toSafeJSON', 1, function () {
    contact.set('name', '<script>');
    equal(contact.toSafeJSON().name, '&lt;script&gt;',
      'It returns html escaped toJSON object');
  });
});
