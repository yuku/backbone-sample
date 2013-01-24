define([
  'underscore',
  'collections/ContactList',
  'views/pc/EditView'
],
function (_, ContactList, EditView) {

  'use strict';

  var contact, contactlist, editview;

  module('EditView', {
    setup: function () {
      contactlist = new ContactList();
      contact = contactlist.create();
      editview = new EditView({model: contact});
    },
    teardown: function () {
      editview.remove();
      contact.destroy();
    }
  });

  test('#renderValidationMessage', 1, function () {
    this.spy(EditView.prototype, 'renderValidationMessage');
    editview = new EditView({model: contact});
    contact.trigger('invalid');
    ok(editview.renderValidationMessage.calledOnce,
      'It is called on model\'s `invalid` event');
  });

  test('#onCancel', 2, function () {
    this.spy(EditView.prototype, 'onCancel');
    editview = new EditView({model: contact});
    editview.on('canceled', function () {
      ok(true, 'It triggers a `canceled` event');
    });
    editview.render().$('.cancel').click();
    ok(editview.onCancel.calledOnce, 'It is called when .cancel is clicked');
  });

  test('#onSubmit', 1, function () {
    this.spy(EditView.prototype, 'onSubmit');
    editview = new EditView({model: contact});
    editview.render().$('form').submit();
    ok(editview.onSubmit.calledOnce, 'It is called when form submitted');
  });

  test('#getValues', 1, function () {
    contact.set({
      name: 'foo',
      email: 'bar@sample.com',
      phone: ''
    });
    editview.render();
    deepEqual(editview.getValues(),
      _.pick(contact.attributes, 'name', 'email', 'phone'),
      'It returns name-value object of form tag');
  });
});
