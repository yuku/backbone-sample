define([
  'models/Contact',
  'collections/ContactList'
],
function (Contact, ContactList) {

  'use strict';

  var contactlist;

  module('ContactList', {
    setup: function () {
      contactlist = new ContactList();
    },
    teardown: function () {
      contactlist.reset();
    }
  });

  test('Singleton', function () {
    var other = new ContactList();
    strictEqual(contactlist, other, 'It is singleton');
  });

  test('#model', 1, function () {
    strictEqual(contactlist.model, Contact, 'It is Contact');
  });

  test('#models', 1, function () {
    contactlist.reset([
      {name: 'abc'},
      {name: 'bcd'},
      {name: 'ACD'}
    ]);
    deepEqual(contactlist.pluck('name'), ['abc', 'ACD', 'bcd'],
      'It is sorted by Contact#index');
  });
});
