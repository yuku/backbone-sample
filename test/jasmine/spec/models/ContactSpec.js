define([
  'models/Contact'
],
function (Contact) {

  'use strict';

  describe('Contact', function () {
    var contact;
    beforeEach(function () {
      contact = new Contact();
    });

    describe('#validate', function () {
      it('should require name', function () {
        contact.set('name', '', {validate: true});
        var errors = contact.validationError;
        expect(errors).toBeDefined();
        expect(errors.name).toBe('Name is required');
      });

      it('should check email format', function () {
        contact.set('email', 'abc', {validate: true});
        var errors = contact.validationError;
        expect(errors).toBeDefined();
        expect(errors.email).toBe('Invalid address');
      });
    });

    describe('#index', function () {
      it('should return the capitalized first character', function () {
        contact.set('name', 'abc');
        expect(contact.index()).toBe('A');
      });

      it('should return the first character for non-ascii name', function () {
        contact.set('name', 'あいう');
        expect(contact.index()).toBe('あ');
      });
    });

    describe('#updateHash', function () {
      it("should be set as a change:email event handler", function () {
        spyOn(Contact.prototype, 'updateHash');
        contact = new Contact();
        contact.set('email', 'whoami@sample.com');
        expect(contact.updateHash).toHaveBeenCalled();
      });

      it('should update a hash attr when an email attr is changed', function () {
        var prev = contact.get('hash');
        contact.set('email', 'whoami@sample.com');
        expect(contact.get('hash')).not.toEqual(prev);
      });
    });
  });
});
