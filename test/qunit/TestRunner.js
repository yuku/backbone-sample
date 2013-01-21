require.config({
  baseUrl: '../../assets/js',
  paths: {
    'jquery'                : 'vendor/jquery-1.8.3',
    'jquery.mobile'         : 'vendor/jquery.mobile-1.2.0',
    'underscore'            : 'vendor/underscore-1.4.3',
    'backbone'              : 'vendor/backbone-0.9.10',
    'backbone.localStorage' : 'vendor/backbone.localStorage-1.0',
    'md5'                   : 'vendor/md5',
    'test'                  : '../../test/qunit/test/'
  },
  shim: {
    'jquery': {
      exports: 'jQuery'
    },
    'underscore': {
      exports: '_'
    },
    'backbone': {
      exports: 'Backbone',
      deps: ['jquery', 'underscore']
    }
  }
});

require(['jquery'], function ($) {

  'use strict';

  var tests = [];

  $(function () {
    require(tests, function () { });
  });
});

