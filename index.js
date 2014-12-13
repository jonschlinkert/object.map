/*!
 * object.map <https://github.com/jonschlinkert/object.map>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var iterator = require('make-iterator');
var forOwn = require('for-own');

module.exports = function objectMap(obj, cb, thisArg) {
  cb = iterator(cb, thisArg);
  var o = {};

  forOwn(obj, function (val, key, orig) {
    o[key] = cb(val, key, orig);
  });
  return o;
};