define([
  'backbone',
  './ItemView',
  'jst/mobile'
],
function (Backbone, ItemView, JST) {

  'use strict';

  return Backbone.View.extend({
    tagName: 'ul',
    attributes: {
      'data-role': 'listview',
      'data-filter': 'true',
      'data-filter-placeholder': 'Search'
    },
    // View methods
    // ------------
    render: function () {
      var index;
      this.$el.html('');
      this.collection.each(function (contact) {
        if (index !== contact.index().charAt(0)) {
          index = contact.index().charAt(0);
          // Insert list-divider
          this.$el.append(JST['mobile/divider']({index: index}));
        }
        var itemview = new ItemView({
          model: contact
        });
        this.$el.append(itemview.render().el);
      }, this);
      return this;
    }
  });
});
