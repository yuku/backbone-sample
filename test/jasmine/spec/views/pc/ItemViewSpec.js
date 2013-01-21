define([
  'collections/ContactList',
  'views/pc/ItemView'
],
function (ContactList, ItemView) {

  'use strict';

  describe('ItemView', function () {

    var contact, contact_list, item_view;

    beforeEach(function () {
      contact_list = new ContactList();
      contact = contact_list.create();
      item_view = new ItemView({model: contact});
    });

    describe('#render', function () {
      it("should be called on model's change event", function () {
        spyOn(ItemView.prototype, 'render');
        item_view = new ItemView({model: contact});
        contact.trigger('change');
        expect(item_view.render).toHaveBeenCalled();
      });

      it('should return view itself', function () {
        expect(item_view.render()).toBe(item_view);
      });
    });

    describe('#remove', function () {
      it("should be called on model's remove event", function () {
        spyOn(ItemView.prototype, 'remove');
        item_view = new ItemView({model: contact});
        contact.trigger('remove');
        expect(item_view.remove).toHaveBeenCalled();
      });
    });

    describe('#presenter', function () {
      it('should return escaped model attrs', function () {
        contact.set('name', '<script>');
        expect(item_view.presenter().name).toBe('&lt;script&gt;');
      });
    });
  });
});
