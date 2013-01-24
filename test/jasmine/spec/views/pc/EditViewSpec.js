define([
  'underscore',
  'collections/ContactList',
  'views/pc/EditView'
],
function (_, ContactList, EditView) {

  'use strict';

  describe('EditView', function () {

    var contact, contactlist, editview;

    beforeEach(function () {
      contactlist = new ContactList();
      contact = contactlist.create();
      editview = new EditView({model: contact});
    });

    afterEach(function () {
      editview.remove();
      contactlist.reset();
    });

    describe('#renderValidationMessage', function () {
      it('should be called on model\'s `invalid` event', function () {
        spyOn(EditView.prototype, 'renderValidationMessage');
        editview = new EditView({model: contact});
        contact.trigger('invalid');
        expect(editview.renderValidationMessage).toHaveBeenCalled();
      });
    });

    describe('#onSubmit', function () {
      it('should be called when form submitted', function () {
        spyOn(EditView.prototype, 'onSubmit').andCallThrough();
        editview = new EditView({model: contact});
        editview.render().$('form').submit();
        expect(editview.onSubmit).toHaveBeenCalled();
      });
    });

    describe('#getValues', function () {
      it('should return name-value object of form tag', function () {
        contact.set({
          name: 'foo',
          email: 'bar@sample.com',
          phone: ''
        });
        editview.render();
        expect(editview.getValues())
          .toEqual(_.pick(contact.attributes, 'name', 'email', 'phone'));
      });
    });
  });
});
