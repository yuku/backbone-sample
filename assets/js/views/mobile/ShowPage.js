define([
  'underscore',
  './Page',
  'jst/mobile'
],
function (_, Page, JST) {

  'use strict';

  return Page.extend({
    events: {
      pagehide: 'remove'
    },
    // View methods
    // ------------
    render: function () {
      this.$el.html(JST['mobile/show']({source: this.presenter()}));
      return this;
    },
    // Helper methods
    // --------------
    presenter: function () {
      return this.model.toEscapedJSON();
    }
  });
});
