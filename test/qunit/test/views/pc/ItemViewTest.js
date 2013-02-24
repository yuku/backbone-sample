define([
  'models/Contact',
  'collections/ContactList',
  'views/pc/ItemView'
],
function (Contact, ContactList, ItemView) {

  'use strict';

  var contact, contactlist, itemview;

  module('pc/ItemView', {
    setup: function () {
      contact = new Contact({name: 'itemview'});
      contactlist = new ContactList();
      contactlist.add(contact);
    },
    teardown: function () {
      itemview.remove();
      contactlist.reset();
    }
  });

  test('#render', 2, function () {
    this.spy(ItemView.prototype, 'render');
    itemview = new ItemView({model: contact});
    contact.trigger('change');
    ok(itemview.render.calledOnce, "It is called on model's change event");
    strictEqual(itemview.render(), itemview, 'It returns view itself');
  });

  test('#remove', 1, function () {
    this.spy(ItemView.prototype, 'remove');
    itemview = new ItemView({model: contact});
    contact.trigger('remove');
    ok(itemview.remove.calledOnce, "It is called on model's remove event");
  });

  test('#presenter', 1, function () {
    itemview = new ItemView({model: contact});
    contact.set('name', '<script>');
    equal(itemview.presenter().name, '&lt;script&gt;',
      'It returns escaped mode attrs');
  });
});
