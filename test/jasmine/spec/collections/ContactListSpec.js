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
        {name: 'cde'},
        {name: 'bcd'}
      ]);
      expect(contactlist.at(0).get('name')).toBe('abc');
      expect(contactlist.at(1).get('name')).toBe('bcd');
      expect(contactlist.at(2).get('name')).toBe('cde');
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
