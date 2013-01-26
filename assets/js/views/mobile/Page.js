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
      options || (options = {});
      _.defaults(options, this.options);
      this.render().$el.appendTo($('body'));
      if (firstpage) {
        firstpage = false;
        mobile.initializePage();
      } else {
        mobile.changePage(this.$el, options);
      }
    }
  });
});
