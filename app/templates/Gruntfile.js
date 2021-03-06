// Generated on <%= (new Date).toISOString().split('T')[0] %> using <%= pkg.name %> <%= pkg.version %>
'use strict';
var LIVERELOAD_PORT = 35729;
var lrSnippet = require('connect-livereload')({port: LIVERELOAD_PORT});
var mountFolder = function (connect, dir) {
  return connect.static(require('path').resolve(dir));
};

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {
  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // configurable paths
  var yeomanConfig = {
    app: 'app',
    dist: 'dist'
  };

  grunt.initConfig({
    yeoman: yeomanConfig,
    watch: {
      livereload: {
        options: {
          livereload: LIVERELOAD_PORT
        },
        files: [
          '<%%= yeoman.app %>/*.html',
          '.tmp/css/{,*/}*.css',
          '{.tmp,<%%= yeoman.app %>}/js/{,*/}*.js',
          '<%%= yeoman.app %>/img/{,*/}*.{png,jpg,jpeg,gif,webp}'
        ]
      }
    },
    connect: {
      options: {
        port: 9000,
        // change this to '0.0.0.0' to access the server from outside
        hostname: 'localhost'
      },
      livereload: {
        options: {
          middleware: function (connect) {
            return [
              lrSnippet,
              mountFolder(connect, '.tmp'),
              mountFolder(connect, yeomanConfig.app)
            ];
          }
        }
      },
      test: {
        options: {
          middleware: function (connect) {
            return [
              mountFolder(connect, '.tmp'),
              mountFolder(connect, 'test')
            ];
          }
        }
      },
      dist: {
        options: {
          middleware: function (connect) {
            return [
              mountFolder(connect, yeomanConfig.dist)
            ];
          }
        }
      }
    },
    open: {
      server: {
        path: 'http://localhost:<%%= connect.options.port %>'
      }
    },
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%%= yeoman.dist %>/*',
            '!<%%= yeoman.dist %>/.git*'
          ]
        }]
      },
      server: '.tmp'
    },
    jshint: {
      grunt: {
        options: {
          jshintrc: '.jshintrc'
        },
        files: {
          src: ['Gruntfile.js']
        }
      },
      dist: {
        options: {
          jshintrc: 'app/js/.jshintrc'
        },
        files: {
         src: [
            '<%%= yeoman.app %>/js/{,*/}*.js',
            '!<%%= yeoman.app %>/js/vendor/*'
          ]
        }
      }
    },
    autoprefixer: {
      options: {
        browsers: ['last 1 version']
      },
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/css/',
          src: '{,*/}*.css',
          dest: '.tmp/css/'
        }]
      }
    },
    // not used since Uglify task does concat,
    // but still available if needed
    /*concat: {
     dist: {}
     },*/
    // not enabled since usemin task does concat and uglify
    // check index.html to edit your build targets
    // enable this task if you prefer defining your build targets here
    /*uglify: {
     dist: {}
     },*/
    rev: {
      dist: {
        files: {
          src: [
            '<%%= yeoman.dist %>/js/{,*/}*.js',
            '<%%= yeoman.dist %>/css/{,*/}*.css',
            '<%%= yeoman.dist %>/img/{,*/}*.{png,jpg,jpeg,gif,webp}',
            '<%%= yeoman.dist %>/css/fonts/*'
          ]
        }
      }
    },
    useminPrepare: {
      options: {
        dest: '<%%= yeoman.dist %>'
      },
      html: '<%%= yeoman.app %>/index.html'
    },
    usemin: {
      options: {
        dirs: ['<%%= yeoman.dist %>']
      },
      html: ['<%%= yeoman.dist %>/{,*/}*.html'],
      css: ['<%%= yeoman.dist %>/css/{,*/}*.css']
    },
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%%= yeoman.app %>/images',
          src: '{,*/}*.{png,jpg,jpeg}',
          dest: '<%%= yeoman.dist %>/images'
        }]
      }
    },
    cssmin: {
      // This task is pre-configured if you do not wish to use Usemin
      // blocks for your CSS. By default, the Usemin block from your
      // `index.html` will take care of minification, e.g.
      //
      //     <!-- build:css({.tmp,app}) css/main.css -->
      //
      // dist: {
      //     files: {
      //         '<%%= yeoman.dist %>/css/main.css': [
      //             '.tmp/css/{,*/}*.css',
      //             '<%%= yeoman.app %>/css/{,*/}*.css'
      //         ]
      //     }
      // }
    },
    htmlmin: {
      dist: {
        options: {
          /*removeCommentsFromCDATA: true,
           // https://github.com/yeoman/grunt-usemin/issues/44
           //collapseWhitespace: true,
           collapseBooleanAttributes: true,
           removeAttributeQuotes: true,
           removeRedundantAttributes: true,
           useShortDoctype: true,
           removeEmptyAttributes: true,
           removeOptionalTags: true*/
        },
        files: [{
          expand: true,
          cwd: '<%%= yeoman.app %>',
          src: '*.html',
          dest: '<%%= yeoman.dist %>'
        }]
      }
    },
    // Put files not handled in other tasks here
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%%= yeoman.app %>',
          dest: '<%%= yeoman.dist %>',
          src: [
            '*.{ico,png,txt}',
            '.htaccess',
            'img/{,*/}*.{webp,gif}',
            'css/fonts/*'
          ]
        }]
      },
      styles: {
        expand: true,
        dot: true,
        cwd: '<%%= yeoman.app %>/css',
        dest: '.tmp/css/',
        src: '{,*/}*.css'
      }
    },
    concurrent: {
      server: [
        'copy:styles'
      ],
      test: [
        'copy:styles'
      ],
      dist: [
        'copy:styles',
        'imagemin',
        'htmlmin'
      ]
    }
  });

  grunt.registerTask('server', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'open', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'concurrent:server',
      'autoprefixer',
      'connect:livereload',
      'open',
      'watch'
    ]);
  });

  grunt.registerTask('build', [
    'clean:dist',
    'useminPrepare',
    'concurrent:dist',
    'autoprefixer',
    'concat',
    'cssmin',
    'uglify',
    'copy:dist',
    'rev',
    'usemin'
  ]);

  grunt.registerTask('default', [
    'jshint',
    'build'
  ]);
};
