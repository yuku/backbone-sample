define([
  'backbone',
  'views/pc/AppView'
],
function (Backbone, AppView) {

  'use strict';

  return Backbone.Router.extend({
    routes: {
      '': 'index',
      ':id': 'new_or_show',
      ':id/edit': 'edit'
    },
    initialize: function (options) {
      this.app = options.app;
      this.appview = new AppView({
        router: this,
        collection: this.app.contactlist
      });
      $('body').append(this.appview.render().el);
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
