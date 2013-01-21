define([
  'models/Contact',
  'collections/ContactList'
],
function (Contact, ContactList) {

  'use strict';

  describe('ContactList', function () {
    var contact_list;
    beforeEach(function () {
      contact_list = new ContactList();
    });

    it('should sort models by Contact#index', function () {
      contact_list.reset([
        {name: 'abc'},
        {name: 'cde'},
        {name: 'bcd'}
      ]);
      expect(contact_list.at(0).get('name')).toBe('abc');
      expect(contact_list.at(1).get('name')).toBe('bcd');
      expect(contact_list.at(2).get('name')).toBe('cde');
    });

    describe('#model', function () {
      it('should be Contact', function () {
        expect(contact_list.model).toBe(Contact);
      });
    });
  });
});
