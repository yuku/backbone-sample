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
      contactlist.reset();
    }
  });

  test('#renderValidationMessage', 1, function () {
    this.spy(EditView.prototype, 'renderValidationMessage');
    editview = new EditView({model: contact});
    contact.trigger('invalid');
    ok(editview.renderValidationMessage.calledOnce,
      'It is called on model\'s `invalid` event');
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
