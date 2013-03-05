define([
  'jquery',
  'jquery.mobile',
  'backbone',
  'underscore'
],
function ($, mobile, Backbone, _) {

  'use strict';

  var firstpage = true;

  return Backbone.View.extend({
    constructor: function () {
      // default options
      this.options = _.extend({
        changeHash: false,
        role: 'page',
        dataUrl: location.pathname
      }, this.options);
      // default attributes
      this.attributes = _.extend({
        'data-role': 'page'
      }, this.attributes);
      Backbone.View.apply(this, arguments);
    },
    show: function (options) {
      $('body').append(this.render().el);
      if (firstpage) {
        firstpage = false;
        mobile.initializePage();
      } else {
        options || (options = {});
        _.defaults(options, this.options);
        mobile.changePage(this.$el, options);
      }
    }
  });
});
