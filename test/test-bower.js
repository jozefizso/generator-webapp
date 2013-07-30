/*global describe, beforeEach, it*/
'use strict';

var path    = require('path');
var fs      = require('fs');
var helpers = require('yeoman-generator').test;
var assert  = require('chai').assert;
var _       =require('./spec_helper.js');

describe('Bower.json test', function () {

  it('creates .bowerrc file', function (done) {

    var bowerrc = _.jsonFile('.bowerrc');
    assert.propertyVal(bowerrc, 'directory', 'app/bower_components');

    done();
  });

  it ('creates valid bower.json file', function (done) {

    var bower = _.jsonFile('bower.json');
    assert.propertyVal(bower, 'name', 'temp');

    done();
  });

});
