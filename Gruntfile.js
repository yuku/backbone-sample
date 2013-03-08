/*jshint node: true */

module.exports = function (grunt) {

  'use strict';

  [
    'grunt-contrib-connect',
    'grunt-contrib-jasmine',
    'grunt-contrib-jst',
    'grunt-contrib-less',
    'grunt-contrib-cssmin',
    'grunt-contrib-qunit',
    'grunt-contrib-requirejs',
    'grunt-contrib-uglify',
    'grunt-contrib-watch'
  ].forEach(function (name) {
    grunt.loadNpmTasks(name);
  });

  grunt.initConfig({
    cssmin: {
      mobile: {
        files: {
          'assets/css/mobile.css': [
            'assets/css/vendor/jquery.mobile.structure-1.3.0.css',
            'assets/css/vendor/theme.css',
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
        },
        amd: true
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
        tasks: ['less', 'cssmin']
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
      options: {
        mainConfigFile: 'assets/js/require.config.js',
        baseUrl: './assets/js',
        paths: {
          requirejs: 'vendor/require-2.1.2'
        },
        include: ['requirejs'],
        optimize: 'none'
      },
      pc: {
        options: {
          out: 'assets/js/dist/pc.js',
          name: 'pc'
        }
      },
      mobile: {
        options: {
          out: 'assets/js/dist/mobile.js',
          name: 'mobile'
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
    },

    qunit: {
      all: {
        options: {
          urls: ['http://localhost:8000/backbone-sample/test/qunit/index.html']
        }
      }
    },

    jasmine: {
      all: {
        options: {
          outfile: 'backbone-sample/test/jasmine/index.html',
          host: 'http://localhost:8000/'
        }
      }
    },

    connect: {
      server: {
        options: {
          port: 8000,
          base: '../'
        }
      }
    }
  });
  grunt.registerTask('build:css', ['less', 'cssmin']);
  grunt.registerTask('build:js', ['jst', 'requirejs']);
  grunt.registerTask('default', ['build:css', 'build:js', 'uglify']);
  grunt.registerTask('test:qunit', ['connect', 'qunit']);
  grunt.registerTask('test:jasmine', ['connect', 'jasmine']);
};
