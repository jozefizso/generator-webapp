/*global describe, beforeEach, it*/
'use strict';

var path    = require('path');
var fs      = require('fs');
var helpers = require('yeoman-generator').test;
var assert  = require('chai').assert;
var jsonlint = require("jsonlint");

require('./spec_helper.js');

describe('Bower.json test', function () {

  it('creates .bowerrc file', function (done) {
    var expected = [
      ['.bowerrc', /"directory": "app\/bower_components"/]
    ];

    helpers.assertFiles(expected);
    done();
  });

  it ('creates valid bower.json file', function (done) {

    var body = fs.readFileSync('bower.json', 'utf8');
    var bowerPkg = jsonlint.parse(body);

    assert.isObject(bowerPkg, 'bower.json is valid object');

    done();
  });

});
