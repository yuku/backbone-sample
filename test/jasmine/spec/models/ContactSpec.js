define([
  'models/Contact',
  'collections/ContactList'
],
function (Contact, ContactList) {

  'use strict';

  describe('Contact', function () {

    var contact, contactlist;

    beforeEach(function () {
      contactlist = new ContactList();
      contact = new Contact();
    });

    afterEach(function () {
      contact.destroy();
      contactlist.reset();
    });

    describe('new instance', function () {
      it('should not added to the collection', function () {
        expect(!!contactlist.get(contact)).toBe(false);
      });

      it('should refer ContactList instance by #collection', function () {
        expect(contact.collection instanceof ContactList).toBe(true);
      });
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

      it('should check unique constraint on email attr', function () {
        contact.set('email', 'abc@sample.com');
        contactlist.add(contact);

        var other = new Contact();
        other.set('email', contact.get('email'), {validate: true});
        var errors = other.validationError || {};
        expect(errors.email).toBe('This address is already in use');
        contact.set({}, {validate: true});
        errors = contact.validationError || {};
        expect(errors.email).toBeUndefined();
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

      it('should return an empty character by default', function () {
        expect(contact.index()).toBe('');
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

    describe('#toSafeJSON', function () {
      it('should return html escaped toJSON object', function () {
        contact.set('name', '<script>');
        expect(contact.toSafeJSON().name).toEqual('&lt;script&gt;');
      });
    });
  });
});
