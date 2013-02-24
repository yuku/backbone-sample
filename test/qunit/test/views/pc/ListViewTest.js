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

  test('#append', function () {
    this.spy(ListView.prototype, 'append');
    _.times(3, function (i) {contactlist.create({name: 'someone' + i});});
    listview = new ListView({collection: contactlist});
    listview.render();
    equal(listview.append.callCount, 3,
      'It is called if collection has models initially');

    var contact = contactlist.create({name: 'someone'}, {silent: true});
    contactlist.trigger('add', contact);
    equal(listview.append.callCount, 4,
      'It is called when an add event occures on the collection');
  });
});
