define([
  'models/Contact',
  'collections/ContactList'
],
function (Contact, ContactList) {

  'use strict';

  describe('ContactList', function () {
    var contactlist;

    beforeEach(function () {
      contactlist = new ContactList();
    });

    afterEach(function () {
      contactlist.reset();
    });

    it('should sort models by Contact#index', function () {
      contactlist.reset([
        {name: 'abc'},
        {name: 'bcd'},
        {name: 'ACD'}
      ]);
      expect(contactlist.pluck('name')).toEqual(['abc', 'ACD', 'bcd']);
    });

    it('should be singleton', function () {
      var other = new ContactList();
      expect(contactlist).toBe(other);
    });

    describe('#model', function () {
      it('should be Contact', function () {
        expect(contactlist.model).toBe(Contact);
      });
    });
  });
});
