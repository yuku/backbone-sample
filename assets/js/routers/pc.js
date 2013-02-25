define([
  'backbone'
],
function (Backbone) {

  'use strict';

  return Backbone.Router.extend({
    routes: {
      '': 'index',
      ':id': 'new_or_show',
      ':id/edit': 'edit'
    },
    new_or_show: function (id) {
      if (id === 'new') {
        //this.trigger('route:new');
        this.trigger('route', 'new');
      } else {
        //this.trigger('route:show', id);
        this.trigger('route', 'show', [id]);
      }
    }
  });
});
