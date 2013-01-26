define([
  'underscore',
  'collections/ContactList',
  'views/pc/ListView'
],
function (_, ContactList, ListView) {

  'use strict';

  var contactlist, listview;

  module('pc/ListView', {
    setup: function () {
      contactlist = new ContactList();
      listview = new ListView({collection: contactlist});
    },
    teardown: function () {
      listview.remove();
      contactlist.reset();
    }
  });

  test('#count', function () {
    equal(listview.count, 0, 'It is initially 0');

    _.times(3, function () {contactlist.create();});
    equal(listview.count, 3, 'It increments when an elem added');
    contactlist.at(0).destroy();
    equal(listview.count, 2, 'It decrements when an elem removed');
  });

  test('#append', function () {
    this.spy(ListView.prototype, 'append');
    _.times(3, function () {contactlist.create();});
    listview = new ListView({collection: contactlist});
    listview.render();
    equal(listview.append.callCount, 3,
      'It is called if collection has models initially');

    var contact = contactlist.create({}, {silent: true});
    contactlist.trigger('add', contact);
    equal(listview.append.callCount, 4,
      'It is called when an add event occures on the collection');
  });
});
