define([
  'underscore',
  'models/Contact',
  'collections/ContactList',
  'views/pc/EditView'
],
function (_, Contact, ContactList, EditView) {

  'use strict';

  var contact, contactlist, editview;

  module('pc/EditView', {
    setup: function () {
      contact = new Contact({name: 'editview'});
      contactlist = new ContactList();
      contactlist.add(contact);
    },
    teardown: function () {
      editview.remove();
      contact.destroy();
      contactlist.reset();
    }
  });

  test('#renderValidationMessage', 1, function () {
    var spy = this.spy(EditView.prototype, 'renderValidationMessage');
    editview = new EditView({model: contact});
    contact.trigger('invalid');
    ok(spy, 'It is called on model\'s `invalid` event');
  });

  test('#onSubmit', 1, function () {
    var spy = this.spy(EditView.prototype, 'onSubmit');
    editview = new EditView({model: contact});
    editview.render().$('form').submit();
    ok(spy, 'It is called when form submitted');
  });

  test('#getValues', 1, function () {
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
    deepEqual(editview.getValues(),
      _.pick(contact.attributes,
        'name', 'email', 'phone', 'github', 'twitter', 'facebook'),
      'It returns name-value object of form tag');
  });
});
