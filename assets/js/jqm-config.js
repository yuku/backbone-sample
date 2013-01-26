define([
  'jquery'
],
function ($) {

  'use strict';

  $(document).on('mobileinit', function () {
    $.extend($.mobile, {
      // Disable jQuery Mobile routing
      ajaxEnabled: false,
      linkBindingEnabled: false,
      hashListeningEnabled: false,
      pushStateEnabled: false,

      autoInitializePage: false,

      defaultPageTransition: 'slide'
    });
  });
});
