define([
  'underscore',
  'models/Contact',
  'collections/ContactList',
  'views/pc/NewView'
],
function (_, Contact, ContactList, NewView) {

  'use strict';

  describe('pc/NewView', function () {

    var contact, contactlist, newview;

    beforeEach(function () {
      contactlist = new ContactList();
      contact = new Contact(null, {collection: contactlist});
    });

    afterEach(function () {
      newview.remove();
      contact.destroy();
      contactlist.reset();
    });

    describe('#renderValidationMessage', function () {
      it('should be called on model\'s `invalid` event', function () {
        var spy = spyOn(NewView.prototype, 'renderValidationMessage');
        newview = new NewView({model: contact});
        contact.trigger('invalid');
        expect(spy).toHaveBeenCalled();
      });
    });

    describe('#onSubmit', function () {
      it('should be called when form submitted', function () {
        var spy = spyOn(NewView.prototype, 'onSubmit').andCallThrough();
        newview = new NewView({model: contact});
        newview.render().$('form').submit();
        expect(spy).toHaveBeenCalled();
      });

      it('should add model to the collection if succeeded', function () {
        contact.set('name', 'newview');
        newview = new NewView({model: contact});
        expect(contactlist.get(contact)).toBeUndefined();
        newview.render().$('form').submit();
        expect(!!contactlist.get(contact)).toEqual(true);
      });
    });

    describe('#getValues', function () {
      it('should return name-value object of form tag', function () {
        newview = new NewView({model: contact});
        contact.set({
          name: 'foo',
          email: 'bar@sample.com',
          phone: '',
          github: '',
          twitter: '',
          facebook: ''
        });
        newview.render();
        expect(newview.getValues())
          .toEqual(_.pick(contact.attributes,
              'name', 'email', 'phone', 'github', 'twitter', 'facebook'));
      });
    });
  });
});
