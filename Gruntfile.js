/*jshint node: true */

module.exports = function (grunt) {

  'use strict';

  [
    'grunt-contrib-jst',
    'grunt-contrib-less',
    'grunt-contrib-mincss',
    'grunt-contrib-watch'
  ].forEach(function (name) {
    grunt.loadNpmTasks(name);
  });

  grunt.initConfig({
    mincss: {
      mobile: {
        files: {
          'assets/css/mobile.css': [
            'assets/css/vendor/jquery.mobile.structure-1.2.0.css',
            'assets/css/mobile.css'
          ]
        }
      }
    },

    jst: {
      options: {
        processName: function (filename) {
          return filename.match(/([^\/]*).html$/)[1];
        },
        processContent: function (src) {
          return src.replace(/(^\s+|\s+$)/gm, '');
        }
      },
      pc: {
        files: {
          'assets/js/jst/pc.js': ['assets/js/templates/pc/*.html']
        }
      },
      mobile: {
        files: {
          'assets/js/jst/mobile.js': ['assets/js/templates/mobile/*.html']
        }
      }
    },

    watch: {
      jst: {
        files: ['assets/js/templates/**/*.html'],
        tasks: ['jst']
      },
      less: {
        files: ['assets/less/*.less'],
        tasks: ['less', 'mincss']
      }
    },

    less: {
      options: {
        compress: true
      },
      pc: {
        files: {
          'assets/css/pc.css': 'assets/less/pc.less'
        }
      },
      mobile: {
        files: {
          'assets/css/mobile.css': 'assets/less/mobile.less'
        }
      }
    }
  });
};
