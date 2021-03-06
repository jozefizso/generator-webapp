'use strict';
var util = require('util');
var path = require('path');
var spawn = require('child_process').spawn;
var yeoman = require('yeoman-generator');


var AppGenerator = module.exports = function Appgenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  // // setup the test-framework property, Gruntfile template will need this
  // this.testFramework = options['test-framework'] || 'mocha';

  // // for hooks to resolve on mocha by default
  // if (!options['test-framework']) {
  //   options['test-framework'] = 'mocha';
  // }

  // // resolved to mocha by default (could be switched to jasmine for instance)
  // this.hookFor('test-framework', { as: 'app' });

  // this.indexFile = this.readFileAsString(path.join(this.sourceRoot(), 'index.html'));
  // this.mainCoffeeFile = 'console.log "\'Allo from CoffeeScript!"';

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(AppGenerator, yeoman.generators.Base);

AppGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // welcome message
  console.log(this.yeoman);
  console.log('Out of the box I include HTML5 Boilerplate, jQuery, Modernizr and Bootstrap CSS.');

  var prompts = [/*{
    type: 'checkbox',
    name: 'features',
    message: 'What more would you like?',
    choices: [{
      name: 'Twitter Bootstrap for Sass',
      value: 'compassBootstrap',
      checked: false
    }, {
      name: 'RequireJS',
      value: 'includeRequireJS',
      checked: false
    }, {
      name: 'Autoprefixer for your CSS',
      value: 'autoprefixer',
      checked: false
    }]
  }*/];

  this.prompt(prompts, function (answers) {
    // var features = answers.features;

    // // manually deal with the response, get back and store the results.
    // // we change a bit this way of doing to automatically do this in the self.prompt() method.
    // this.compassBootstrap = features.indexOf('compassBootstrap') !== -1;
    // this.includeRequireJS = features.indexOf('includeRequireJS') !== -1;
    // this.autoprefixer = features.indexOf('autoprefixer') !== -1;

    cb();
  }.bind(this));
};


AppGenerator.prototype.app = function app() {
  this.mkdir('app');
  this.mkdir('app/js');
  this.mkdir('app/css');
  this.mkdir('app/img');
};

AppGenerator.prototype.gruntfile = function gruntfile() {
  this.template('Gruntfile.js');
};

AppGenerator.prototype.packageJSON = function packageJSON() {
  this.template('_package.json', 'package.json');
};

AppGenerator.prototype.git = function git() {
  this.copy('gitignore', '.gitignore');
  this.copy('gitattributes', '.gitattributes');
};

AppGenerator.prototype.bower = function bower() {
  this.copy('bowerrc', '.bowerrc');
  this.copy('_bower.json', 'bower.json');
};

AppGenerator.prototype.jshint = function jshint() {
  this.copy('jshintrc', '.jshintrc');
  this.copy('app/jshintrc', 'app/js/.jshintrc');
};

AppGenerator.prototype.editorConfig = function editorConfig() {
  this.copy('editorconfig', '.editorconfig');
};

AppGenerator.prototype.h5bp = function h5bp() {
  this.copy('app/favicon.ico', 'app/favicon.ico');
  this.copy('app/404.html', 'app/404.html');
  this.copy('app/index.html', 'app/index.html');
  this.copy('app/robots.txt', 'app/robots.txt');
  this.copy('app/htaccess', 'app/.htaccess');
};

AppGenerator.prototype.mainStylesheet = function mainStylesheet() {
  this.copy('app/site.css', 'app/css/site.css');
};

AppGenerator.prototype.mainJavaScript = function mainJavaScript() {
  this.copy('app/main.js', 'app/js/main.js');
};

// AppGenerator.prototype.writeIndex = function writeIndex() {
//   // prepare default content text
//   var defaults = ['HTML5 Boilerplate'];
//   var contentText = [
//     '        <div class="container">',
//     '            <div class="hero-unit">',
//     '                <h1>\'Allo, \'Allo!</h1>',
//     '                <p>You now have</p>',
//     '                <ul>'
//   ];

//   if (!this.includeRequireJS) {
//     this.indexFile = this.appendScripts(this.indexFile, 'scripts/main.js', [
//       'bower_components/jquery/jquery.js',
//       'scripts/main.js'
//     ]);

//     this.indexFile = this.appendFiles({
//       html: this.indexFile,
//       fileType: 'js',
//       optimizedPath: 'scripts/coffee.js',
//       sourceFileList: ['scripts/hello.js'],
//       searchPath: '.tmp'
//     });
//   }

//   if (this.compassBootstrap) {
//     defaults.push('Twitter Bootstrap');
//   }

//   if (this.compassBootstrap && !this.includeRequireJS) {
//     // wire Twitter Bootstrap plugins
//     this.indexFile = this.appendScripts(this.indexFile, 'scripts/plugins.js', [
//       'bower_components/sass-bootstrap/js/bootstrap-affix.js',
//       'bower_components/sass-bootstrap/js/bootstrap-alert.js',
//       'bower_components/sass-bootstrap/js/bootstrap-dropdown.js',
//       'bower_components/sass-bootstrap/js/bootstrap-tooltip.js',
//       'bower_components/sass-bootstrap/js/bootstrap-modal.js',
//       'bower_components/sass-bootstrap/js/bootstrap-transition.js',
//       'bower_components/sass-bootstrap/js/bootstrap-button.js',
//       'bower_components/sass-bootstrap/js/bootstrap-popover.js',
//       'bower_components/sass-bootstrap/js/bootstrap-typeahead.js',
//       'bower_components/sass-bootstrap/js/bootstrap-carousel.js',
//       'bower_components/sass-bootstrap/js/bootstrap-scrollspy.js',
//       'bower_components/sass-bootstrap/js/bootstrap-collapse.js',
//       'bower_components/sass-bootstrap/js/bootstrap-tab.js'
//     ]);
//   }

//   if (this.includeRequireJS) {
//     defaults.push('RequireJS');
//   }

//   // iterate over defaults and create content string
//   defaults.forEach(function (el) {
//     contentText.push('                    <li>' + el  +'</li>');
//   });

//   contentText = contentText.concat([
//     '                </ul>',
//     '                <p>installed.</p>',
//     '                <h3>Enjoy coding! - Yeoman</h3>',
//     '            </div>',
//     '        </div>',
//     ''
//   ]);

//   // append the default content
//   this.indexFile = this.indexFile.replace('<body>', '<body>\n' + contentText.join('\n'));
// };


