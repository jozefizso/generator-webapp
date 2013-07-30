/*global beforeEach, it*/
'use strict';

var path    = require('path');
var helpers = require('yeoman-generator').test;
var assert = require('chai').assert;

before(function (done) {
  helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
    if (err) {
      return done(err);
    }

    this.webapp = helpers.createGenerator('webapp:app', [
      '../../app', [
        helpers.createDummyGenerator(),
        'mocha:app'
      ]
    ]);
    this.webapp.options['skip-install'] = true;

    this.webapp.run({}, function() {
      done();
    });
  }.bind(this));
});
