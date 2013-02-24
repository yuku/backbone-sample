define([
  'underscore',
  'models/Contact',
  'collections/ContactList',
  'views/pc/NewView'
],
function (_, Contact, ContactList, NewView) {

  'use strict';

  var contact, contactlist, newview;

  module('pc/NewView', {
    setup: function () {
      contact = new Contact();
      contactlist = new ContactList();
    },
    teardown: function () {
      newview.remove();
      contact.destroy();
      contactlist.reset();
    }
  });

  test('#renderValidationMessage', 1, function () {
    var spy = this.spy(NewView.prototype, 'renderValidationMessage');
    newview = new NewView({model: contact});
    contact.trigger('invalid');
    ok(spy, 'It is called on model\'s `invalid` event');
  });

  test('#onSubmit', 3, function () {
    var spy = this.spy(NewView.prototype, 'onSubmit');
    contact.set('name', 'newview');
    newview = new NewView({model: contact});
    ok(!contactlist.get(contact),
      'Initially model is not added to collection');
    newview.render().$('form').submit();
    ok(spy, 'It is called when form submitted');
    ok(contactlist.get(contact),
      'It adds model to the collection');
  });

  test('#getValues', 1, function () {
    contact.set({
      name: 'foo',
      email: 'bar@sample.com',
      phone: '',
      github: '',
      twitter: '',
      facebook: ''
    });
    newview = new NewView({model: contact});
    newview.render();
    deepEqual(newview.getValues(),
      _.pick(contact.attributes,
        'name', 'email', 'phone', 'github', 'twitter', 'facebook'),
      'It returns name-value object of form tag');
  });
});

