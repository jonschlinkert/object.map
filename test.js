/*!
 * object.map <https://github.com/jonschlinkert/object.map>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT License
 */

'use strict';

require('mocha');
var assert = require('assert');
var mapValues = require('./');

describe('map values', function() {
  it('should pass the object value as the first param', function() {
    var actual = mapValues({a: 'a', b: 'b' }, function(val, key) {
      return val + val;
    });

    assert.equal(actual.a, 'aa');
    assert.equal(actual.b, 'bb');
  });

  it('should pass the object key as the second param', function() {
    var actual = mapValues({a: 'a', b: 'b' }, function(val, key) {
      return key + key;
    });

    assert.equal(actual.a, 'aa');
    assert.equal(actual.b, 'bb');
  });

  it('should pass the original object as the third param', function() {
    var actual = mapValues({a: 'a', b: 'b'}, function(v, k, o) {
      return o;
    });
    assert.deepEqual(actual.a, {a: 'a', b: 'b'});
    assert.deepEqual(actual.b, {a: 'a', b: 'b'});
  });

  it('should expose the object passed after the callback as `this`.', function() {
    var actual = mapValues({ foo: null }, function() {
      return this;
    }, {a: 'b'});

    assert.deepEqual(actual.foo, {a: 'b'});
  });

  it('should map values when a property name is defined.', function () {
    var fixture = {
      a : {x: 'x', y: 'y', z: 'z'},
      b : {x: 'x', y: 'y', z: 'z'},
      c : {x: 'x', y: 'y', z: 'z'}
    };
    assert.deepEqual(mapValues(fixture, 'f'), {a: undefined, b: undefined, c: undefined });
    assert.deepEqual(mapValues(fixture, 'x'), {a: 'x', b: 'x',c: 'x'});
    assert.deepEqual(mapValues(fixture, 'y'), {a: 'y', b: 'y', c: 'y' });
  });

  it('should return a new object with the same values when no callback is defined', function () {
    assert.deepEqual(mapValues({a: 'a', b: 'b'}), {a: 'a', b: 'b'});
  });
});
