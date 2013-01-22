define([
  'underscore',
  'collections/ContactList',
  'views/pc/ListView'
],
function (_, ContactList, ListView) {

  'use strict';

  var contact_list, list_view;

  module('ListView', {
    setup: function () {
      contact_list = new ContactList();
      list_view = new ListView({collection: contact_list});
    }
  });

  test('#count', function () {
    equal(list_view.count, 0, 'It is initially 0');

    _.times(3, function () {contact_list.create();});
    equal(list_view.count, 3, 'It increments when an elem added');
    contact_list.at(0).destroy();
    equal(list_view.count, 2, 'It decrements when an elem removed');
  });

  test('#append', function () {
    this.spy(ListView.prototype, 'append');
    _.times(3, function () {contact_list.create();});
    list_view = new ListView({collection: contact_list});
    list_view.render();
    equal(list_view.append.callCount, 3,
      'It is called if collection has models initially');

    var contact = contact_list.create({}, {silent: true});
    contact_list.trigger('add', contact);
    equal(list_view.append.callCount, 4,
      'It is called when an add event occures on the collection');
  });
});
