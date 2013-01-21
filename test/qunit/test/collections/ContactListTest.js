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

  test('models are sorted by Contact#index', function () {
    contact_list.reset([
      {name: 'abc'},
      {name: 'cde'},
      {name: 'bcd'}
    ]);
    equal(contact_list.at(0).get('name'), 'abc');
    equal(contact_list.at(1).get('name'), 'bcd');
    equal(contact_list.at(2).get('name'), 'cde');
  });

  test('#model is Contact', 1, function () {
    strictEqual(contact_list.model, Contact);
  });
});
