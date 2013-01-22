require.config({
  baseUrl: '../../assets/js',
  paths: {
    'jquery'                : 'vendor/jquery-1.8.3',
    'jquery.mobile'         : 'vendor/jquery.mobile-1.2.0',
    'underscore'            : 'vendor/underscore-1.4.3',
    'backbone'              : 'vendor/backbone-0.9.10',
    'backbone.localStorage' : 'vendor/backbone.localStorage-1.0',
    'md5'                   : 'vendor/md5',
    'jasmine'               : '../../test/jasmine/vendor/jasmine-1.3.1',
    'jasmine-html'          : '../../test/jasmine/vendor/jasmine-html-1.3.1',
    'spec'                  : '../../test/jasmine/spec/'
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
    'jasmine-html': {
      exports: 'jasmine',
      deps: ['jasmine']
    }
  }
});

require(['jquery', 'jasmine-html'], function ($, jasmine) {

  'use strict';

  var specs = [
    'spec/models/ContactSpec',
    'spec/collections/ContactListSpec',
    'spec/views/pc/ItemViewSpec',
    'spec/views/pc/ListViewSpec'
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
