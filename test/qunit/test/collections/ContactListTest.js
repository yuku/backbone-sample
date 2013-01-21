define([
  'models/Contact',
  'collections/ContactList'
],
function (Contact, ContactList) {

  'use strict';

  var contact_list;

  module('ContactList', {
    setup: function () {
      contact_list = new ContactList();
    }
  });

  test('#model', 1, function () {
    strictEqual(contact_list.model, Contact, 'It is Contact');
  });

  test('#models', 1, function () {
    contact_list.reset([
      {name: 'abc'},
      {name: 'cde'},
      {name: 'bcd'}
    ]);
    deepEqual(contact_list.pluck('name'), ['abc', 'bcd', 'cde'],
      'It is sorted by Contact#index');
  });
});
