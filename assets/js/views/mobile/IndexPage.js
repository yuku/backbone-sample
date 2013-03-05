define([
  './Page',
  './ListView',
  'jst/mobile'
],
function (Page, ListView, JST) {

  'use strict';

  // Singleton
  var instance;

  return Page.extend({
    options: {
      reverse: true
    },
    constructor: function () {
      if (!instance) {
        instance = this;
        Page.apply(instance, arguments);
      }
      return instance;
    },
    initialize: function () {
      var listview = new ListView({collection: this.collection});
      this.listenTo(this.collection, 'all', this.remove);
      this.$el
        .html(JST['mobile/index']())
        .find('[data-role=content]').append(listview.render().el);
    },
    remove: function () {
      instance = null;
      Page.prototype.remove.apply(this, arguments);
    }
  });
});
