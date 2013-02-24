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
    }
  });

  test('#append', function () {
    this.spy(ListView.prototype, 'append');
    contactlist.add([
      {name: 'listview1'},
      {name: 'listview2'},
      {name: 'listview3'}
    ]);
    listview = new ListView({collection: contactlist});
    listview.render();
    equal(listview.append.callCount, 3,
      'It is called if collection has models initially');

    contactlist.add({name: 'listview4'});
    equal(listview.append.callCount, 4,
      'It is called when an add event occures on the collection');
  });
});
