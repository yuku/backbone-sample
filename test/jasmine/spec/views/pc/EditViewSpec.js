define([
  'underscore',
  'models/Contact',
  'collections/ContactList',
  'views/pc/EditView'
],
function (_, Contact, ContactList, EditView) {

  'use strict';

  describe('pc/EditView', function () {

    var contact, contactlist, editview;

    beforeEach(function () {
      contact = new Contact({name: 'editview'});
      contactlist = new ContactList();
      contactlist.add(contact);
    });

    afterEach(function () {
      editview.remove();
      contact.destroy();
      contactlist.reset();
    });

    describe('#renderValidationMessage', function () {
      it('should be called on model\'s `invalid` event', function () {
        var spy = spyOn(EditView.prototype, 'renderValidationMessage');
        editview = new EditView({model: contact});
        contact.trigger('invalid');
        expect(spy).toHaveBeenCalled();
      });
    });

    describe('#onSubmit', function () {
      it('should be called when form submitted', function () {
        var spy = spyOn(EditView.prototype, 'onSubmit').andCallThrough();
        editview = new EditView({model: contact});
        editview.render().$('form').submit();
        expect(spy).toHaveBeenCalled();
      });
    });

    describe('#getValues', function () {
      it('should return name-value object of form tag', function () {
        editview = new EditView({model: contact});
        contact.set({
          name: 'foo',
          email: 'bar@sample.com',
          phone: '',
          github: '',
          twitter: '',
          facebook: ''
        });
        editview.render();
        expect(editview.getValues())
          .toEqual(_.pick(contact.attributes,
              'name', 'email', 'phone', 'github', 'twitter', 'facebook'));
      });
    });
  });
});
