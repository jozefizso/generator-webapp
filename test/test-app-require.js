/*global describe, beforeEach, it*/
'use strict';

var assert = require('chai').assert;

describe('Webapp generator test', function () {

  it('the generator can be required without throwing', function () {
    var app = require('../app');

    assert.isDefined(app, 'webapp generator can be required');
  });

});