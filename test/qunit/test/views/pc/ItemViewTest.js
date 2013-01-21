define([
  'collections/ContactList',
  'views/pc/ItemView'
],
function (ContactList, ItemView) {

  'use strict';

  var contact, contact_list, item_view;

  module('ItemView', {
    setup: function () {
      contact_list = new ContactList();
      contact = contact_list.create();
      item_view = new ItemView({model: contact});
    }
  });

  test('#render', 2, function () {
    this.spy(ItemView.prototype, 'render');
    item_view = new ItemView({model: contact});
    contact.trigger('change');
    ok(item_view.render.calledOnce, "It is called on model's change event");
    strictEqual(item_view.render(), item_view, 'It returns view itself');
  });

  test('#remove', 1, function () {
    this.spy(ItemView.prototype, 'remove');
    item_view = new ItemView({model: contact});
    contact.trigger('remove');
    ok(item_view.remove.calledOnce, "It is called on model's remove event");
  });

  test('#presenter', 1, function () {
    contact.set('name', '<script>');
    equal(item_view.presenter().name, '&lt;script&gt;',
      'It returns escaped mode attrs');
  });
});
