/*jshint node: true */

module.exports = function (grunt) {

  'use strict';

  [
    'grunt-contrib-jst',
    'grunt-contrib-less',
    'grunt-contrib-mincss',
    'grunt-contrib-requirejs',
    'grunt-contrib-uglify',
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
          return filename.match(/((?:mobile|pc)\/.*).html$/)[1];
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
    },

    requirejs: {
      pc: {
        options: {
          mainConfigFile: 'assets/js/require.config.js',
          baseUrl: './assets/js',
          out: 'assets/js/dist/pc.js',
          paths: {
            requirejs: 'vendor/require-2.1.2'
          },
          include: ['requirejs'],
          name: 'pc',
          optimize: 'none'
        }
      },
      mobile: {
        options: {
          mainConfigFile: 'assets/js/require.config.js',
          baseUrl: './assets/js',
          out: 'assets/js/dist/mobile.js',
          paths: {
            requirejs: 'vendor/require-2.1.2'
          },
          include: ['requirejs'],
          name: 'mobile',
          optimize: 'none'
        }
      }
    },

    uglify: {
      pc: {
        files: {
          'assets/js/dist/pc.min.js': [
            'assets/js/dist/pc.js',
            'assets/js/ga.js'
          ]
        }
      },
      mobile: {
        files: {
          'assets/js/dist/mobile.min.js': [
            'assets/js/dist/mobile.js',
            'assets/js/ga.js'
          ]
        }
      }
    }
  });

  grunt.registerTask('build:css', ['less', 'mincss']);
  grunt.registerTask('build:js', ['jst', 'requirejs']);
  grunt.registerTask('default', ['build:css', 'build:js', 'uglify']);
};
