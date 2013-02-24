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

    describe('#count', function () {
      it('should initially be 0', function () {
        expect(listview.count).toBe(0);
      });

      it('should equal to the size of collection', function () {
        _.times(3, function (i) {contactlist.create({name: 'someone' + i});});
        expect(listview.count).toBe(3);
        contactlist.at(0).destroy();
        expect(listview.count).toBe(2);
      });
    });

    describe('#append', function () {
      it('should called on add event', function () {
        spyOn(ListView.prototype, 'append');
        listview = new ListView({collection: contactlist});
        var contact = contactlist.create({name: 'someone'}, {silent: true});
        contactlist.trigger('add', contact);
        expect(listview.append).toHaveBeenCalled();
      });

      it('should be called if collection initially has models', function () {
        spyOn(ListView.prototype, 'append');
        _.times(3, function (i) {contactlist.create({name: 'someone' + i});});
        listview = new ListView({collection: contactlist});
        listview.render();
        expect(listview.append.calls.length).toBe(3);
      });
    });
  });
});
