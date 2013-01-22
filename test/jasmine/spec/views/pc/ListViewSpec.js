define([
  'underscore',
  'collections/ContactList',
  'views/pc/ListView'
],
function (_, ContactList, ListView) {

  'use strict';

  describe('ListView', function () {

    var contact_list, list_view;

    beforeEach(function () {
      contact_list = new ContactList();
      list_view = new ListView({collection: contact_list});
    });

    describe('#count', function () {
      it('should initially be 0', function () {
        expect(list_view.count).toBe(0);
      });

      it('should equal to the size of collection', function () {
        _.times(3, function () {contact_list.create();});
        expect(list_view.count).toBe(3);
        contact_list.at(0).destroy();
        expect(list_view.count).toBe(2);
      });
    });

    describe('#append', function () {
      it('should called on add event', function () {
        spyOn(ListView.prototype, 'append');
        list_view = new ListView({collection: contact_list});
        var contact = contact_list.create({}, {silent: true});
        contact_list.trigger('add', contact);
        expect(list_view.append).toHaveBeenCalled();
      });

      it('should be called if collection initially has models', function () {
        spyOn(ListView.prototype, 'append');
        _.times(3, function () {contact_list.create();});
        list_view = new ListView({collection: contact_list});
        list_view.render();
        expect(list_view.append.calls.length).toBe(3);
      });
    });
  });
});
