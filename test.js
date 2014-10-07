/*!
 * object.map <https://github.com/jonschlinkert/object.map>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT License
 */

'use strict';

var assert = require('assert');
var should = require('should');
var mapValues = require('./');

describe('map values', function() {
  it('should pass the object value as the first param', function() {
    var actual = mapValues({a: 'a', b: 'b' }, function(val, key) {
      return val + val;
    });

    actual.a.should.equal('aa');
    actual.b.should.equal('bb');
  });

  it('should pass the object key as the second param', function() {
    var actual = mapValues({a: 'a', b: 'b' }, function(val, key) {
      return key + key;
    });

    actual.a.should.equal('aa');
    actual.b.should.equal('bb');
  });

  it('should pass the original object as the third param', function() {
    var actual = mapValues({a: 'a', b: 'b'}, function(v, k, o) {
      return o;
    });
    actual.a.should.eql({a: 'a', b: 'b'});
    actual.b.should.eql({a: 'a', b: 'b'});
  });

  it('should expose the object passed after the callback as `this`.', function() {
    var actual = mapValues({ foo: null }, function() {
      return this;
    }, {a: 'b'});

    actual.foo.should.eql({a: 'b'});
  });

  it('should map values when a property name is defined.', function () {
    var fixture = {
      a : {x: 'x', y: 'y', z: 'z'},
      b : {x: 'x', y: 'y', z: 'z'},
      c : {x: 'x', y: 'y', z: 'z'}
    };
    mapValues(fixture, 'f').should.eql({a: undefined, b: undefined, c: undefined });
    mapValues(fixture, 'x').should.eql({a: 'x', b: 'x',c: 'x'});
    mapValues(fixture, 'y').should.eql({a: 'y', b: 'y', c: 'y' });
  });

  it('should return a new object with the same values when no callback is defined', function () {
    mapValues({a: 'a', b: 'b'}).should.eql({a: 'a', b: 'b'});
  });
});
