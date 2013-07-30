/*global beforeEach, it*/
'use strict';

var path    = require('path');
var fs      = require('fs');
var helpers = require('yeoman-generator').test;
var assert  = require('chai').assert;
var jsonlint = require("jsonlint");

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


module.exports.jsonFile = function jsonFile (file) {
  var here = fs.existsSync(file);
  assert.ok(here, file + ', no such file or directory');

  var body = fs.readFileSync(file, 'utf8');
  try {
    var obj = jsonlint.parse(body);
    return obj;
  } catch(e) {
    assert.ok(false, file +' is not valid JSON file:\n'+ e.message);
  }
}
