/*!
 * object.map <https://github.com/jonschlinkert/object.map>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var makeIterator = require('make-iterator');
var forOwn = require('for-own');

module.exports = function mapValues(obj, cb, thisArg) {
  cb = makeIterator(cb, thisArg);

  var o = {};
  forOwn(obj, function (value, key, orig) {
    o[key] = cb(value, key, orig);
  });

  return o;
};