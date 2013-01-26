define([
  'underscore',
  'collections/ContactList',
  'views/pc/NewView'
],
function (_, ContactList, NewView) {

  'use strict';

  var contact, contactlist, newview;

  module('pc/NewView', {
    setup: function () {
      contactlist = new ContactList();
      contact = new contactlist.model(null, {collection: contactlist});
      newview = new NewView({model: contact});
    },
    teardown: function () {
      newview.remove();
      contact.destroy();
      contactlist.reset();
    }
  });

  test('#renderValidationMessage', 1, function () {
    this.spy(NewView.prototype, 'renderValidationMessage');
    newview = new NewView({model: contact});
    contact.trigger('invalid');
    ok(newview.renderValidationMessage.calledOnce,
      'It is called on model\'s `invalid` event');
  });

  test('#onSubmit', 3, function () {
    this.spy(NewView.prototype, 'onSubmit');
    contact.set('name', 'Somebody');
    newview = new NewView({model: contact});
    ok(!contactlist.get(contact),
      'Initially model is not added to collection');
    newview.render().$('form').submit();
    ok(newview.onSubmit.calledOnce, 'It is called when form submitted');
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
    newview.render();
    deepEqual(newview.getValues(),
      _.pick(contact.attributes,
        'name', 'email', 'phone', 'github', 'twitter', 'facebook'),
      'It returns name-value object of form tag');
  });
});

