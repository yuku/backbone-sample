require.config({
  baseUrl: '../../assets/js',
  paths: {
    'jquery'                : 'vendor/jquery-1.8.3',
    'jquery.mobile'         : 'vendor/jquery.mobile-1.3.0',
    'underscore'            : 'vendor/underscore-1.4.3',
    'backbone'              : 'vendor/backbone-0.9.10',
    'backbone.localStorage' : 'vendor/backbone.localStorage-1.1.0',
    'md5'                   : 'vendor/md5',
    'spec'                  : '../../test/jasmine/spec'
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

  var specs = [
    'spec/models/ContactSpec',
    'spec/collections/ContactListSpec',
    'spec/views/pc/ItemViewSpec',
    'spec/views/pc/ListViewSpec',
    'spec/views/pc/EditViewSpec',
    'spec/views/pc/NewViewSpec'
  ];

  var jasmineEnv = jasmine.getEnv();
  jasmineEnv.updateInterval = 1000;

  var htmlReporter = new jasmine.HtmlReporter();

  jasmineEnv.addReporter(htmlReporter);

  jasmineEnv.specFilter = function(spec) {
    return htmlReporter.specFilter(spec);
  };

  $(function(){
    require(specs, function(){
      jasmineEnv.execute();
    });
  });
});
