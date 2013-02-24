define([
  'models/Contact',
  'collections/ContactList',
  'views/pc/ItemView'
],
function (Contact, ContactList, ItemView) {

  'use strict';

  describe('pc/ItemView', function () {

    var contact, contactlist, itemview;

    beforeEach(function () {
      contact = new Contact({name: 'itemview'});
      contactlist = new ContactList();
      contactlist.add(contact);
    });

    afterEach(function () {
      itemview.remove();
      contactlist.reset();
    });

    describe('#render', function () {
      it("should be called on model's change event", function () {
        spyOn(ItemView.prototype, 'render');
        itemview = new ItemView({model: contact});
        contact.trigger('change');
        expect(itemview.render).toHaveBeenCalled();
      });

      it('should return view itself', function () {
        expect(itemview.render()).toBe(itemview);
      });
    });

    describe('#remove', function () {
      it("should be called on model's remove event", function () {
        spyOn(ItemView.prototype, 'remove');
        itemview = new ItemView({model: contact});
        contact.trigger('remove');
        expect(itemview.remove).toHaveBeenCalled();
      });
    });

    describe('#presenter', function () {
      it('should return escaped model attrs', function () {
        itemview = new ItemView({model: contact});
        contact.set('name', '<script>');
        expect(itemview.presenter().name).toBe('&lt;script&gt;');
      });
    });
  });
});
