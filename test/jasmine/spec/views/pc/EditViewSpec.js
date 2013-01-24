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

    describe('#renderValidationMessage', function () {
      it('should be called on model\'s `invalid` event', function () {
        spyOn(EditView.prototype, 'renderValidationMessage');
        editview = new EditView({model: contact});
        contact.trigger('invalid');
        expect(editview.renderValidationMessage).toHaveBeenCalled();
      });
    });

    describe('#onCancel', function () {
      it('should be called when .cancel is clicked', function () {
        spyOn(EditView.prototype, 'onCancel');
        editview = new EditView({model: contact});
        editview.render().$('.cancel').click();
        expect(editview.onCancel).toHaveBeenCalled();
      });

      it('should trigger `canceled` event', function () {
        var flag;
        editview.on('canceled', function () { flag = true; });
        editview.onCancel(document.createEvent('Event'));
        expect(flag).toBe(true);
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
