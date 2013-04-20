/*jshint unused: false */
/*global require: true */
var require = {
  baseUrl: '/backbone-sample/assets/js',
  paths: {
    'jquery'                : 'vendor/jquery-1.8.3',
    'jquery.mobile'         : 'vendor/jquery.mobile-1.3.0',
    'underscore'            : 'vendor/underscore-1.4.4',
    'backbone'              : 'vendor/backbone-1.0.0',
    'backbone.localStorage' : 'vendor/backbone.localStorage-1.1.0',
    'md5'                   : 'vendor/md5'
  },
  shim: {
    // To edit the deps of jquery.mobile, edit AMD registration section in
    // vendor/jquery.mobile.js. Even though you declare the dependencies here,
    // it will be overrided by `grunt requirejs`
    // 'jquery.mobile': ['jquery', 'jqm-config'],
    'underscore': {
      exports: '_'
    },
    'backbone': {
      exports: 'Backbone',
      deps: ['jquery', 'underscore']
    }
  }
};
