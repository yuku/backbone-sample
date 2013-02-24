define([
  'underscore',
  'collections/ContactList',
  'views/pc/ListView'
],
function (_, ContactList, ListView) {

  'use strict';

  describe('pc/ListView', function () {

    var contactlist, listview;

    beforeEach(function () {
      contactlist = new ContactList();
      listview = new ListView({collection: contactlist});
    });

    afterEach(function () {
      listview.remove();
      contactlist.reset();
    });

    describe('#append', function () {
      it('should called on add event', function () {
        spyOn(ListView.prototype, 'append');
        listview = new ListView({collection: contactlist});
        contactlist.add({name: 'listview'});
        expect(listview.append).toHaveBeenCalled();
      });

      it('should be called if collection initially has models', function () {
        spyOn(ListView.prototype, 'append');
        contactlist.add([
          {name: 'listview1'},
          {name: 'listview2'},
          {name: 'listview3'}
        ]);
        listview = new ListView({collection: contactlist});
        listview.render();
        expect(listview.append.calls.length).toBe(3);
      });
    });
  });
});
