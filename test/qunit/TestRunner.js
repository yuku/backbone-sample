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
    },
    'jst/pc': {
      exports: 'JST'
    },
    'jst/mobile': {
      exports: 'JST'
    }
  }
});

require(['jquery'], function ($) {

  'use strict';

  var tests = [
    'test/models/ContactTest',
    'test/collections/ContactListTest',
    'test/views/pc/ItemViewTest',
    'test/views/pc/ListViewTest',
    'test/views/pc/EditViewTest',
    'test/views/pc/NewViewTest'
  ];

  $(function () {
    require(tests, function () { });
  });
});

