define([
  'underscore',
  'collections/ContactList',
  'views/pc/NewView'
],
function (_, ContactList, NewView) {

  'use strict';

  describe('NewView', function () {

    var contact, contactlist, newview;

    beforeEach(function () {
      contactlist = new ContactList();
      contact = new contactlist.model(null, {collection: contactlist});
      newview = new NewView({model: contact});
    });

    afterEach(function () {
      newview.remove();
      contact.destroy();
      contactlist.reset();
    });

    describe('#renderValidationMessage', function () {
      it('should be called on model\'s `invalid` event', function () {
        spyOn(NewView.prototype, 'renderValidationMessage');
        newview = new NewView({model: contact});
        contact.trigger('invalid');
        expect(newview.renderValidationMessage).toHaveBeenCalled();
      });
    });

    describe('#onSubmit', function () {
      it('should be called when form submitted', function () {
        spyOn(NewView.prototype, 'onSubmit').andCallThrough();
        newview = new NewView({model: contact});
        newview.render().$('form').submit();
        expect(newview.onSubmit).toHaveBeenCalled();
      });

      it('should add model to the collection if succeeded', function () {
        contact.set('name', 'Somebody');
        newview = new NewView({model: contact});
        expect(contactlist.get(contact)).toBeUndefined();
        newview.render().$('form').submit();
        expect(!!contactlist.get(contact)).toEqual(true);
      });
    });

    describe('#getValues', function () {
      it('should return name-value object of form tag', function () {
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
