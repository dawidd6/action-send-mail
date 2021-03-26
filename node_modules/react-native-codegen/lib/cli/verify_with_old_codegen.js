/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *
 * @format
 */
'use strict';

function _slicedToArray(arr, i) {
  return (
    _arrayWithHoles(arr) ||
    _iterableToArrayLimit(arr, i) ||
    _unsupportedIterableToArray(arr, i) ||
    _nonIterableRest()
  );
}

function _nonIterableRest() {
  throw new TypeError(
    'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
  );
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === 'string') return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === 'Object' && o.constructor) n = o.constructor.name;
  if (n === 'Map' || n === 'Set') return Array.from(o);
  if (n === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
    return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === 'undefined' || !(Symbol.iterator in Object(arr)))
    return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;
  try {
    for (
      var _i = arr[Symbol.iterator](), _s;
      !(_n = (_s = _i.next()).done);
      _n = true
    ) {
      _arr.push(_s.value);
      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i['return'] != null) _i['return']();
    } finally {
      if (_d) throw _e;
    }
  }
  return _arr;
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

const fs = require('fs');

const _process$argv$slice = process.argv.slice(2),
  _process$argv$slice2 = _slicedToArray(_process$argv$slice, 2),
  first = _process$argv$slice2[0],
  second = _process$argv$slice2[1];

const contents1 = fs.readFileSync(first, 'utf8');
const contents2 = fs.readFileSync(second, 'utf8');

function traverse(t) {
  return t
    .replace(/\).invoke/g, ')\n.invoke') // in old codegen it was in one line
    .split('\n')
    .map(l => l.trim()) // no whitespaces
    .filter(Boolean) // no empty lines
    .filter(
      l =>
        !l.startsWith('namespace') && // no namespaces
        !l.startsWith('}') && // after removing openign namespaces we need to remove all closings
        !l.startsWith('/**') && // all comments
        !l.startsWith('#') && // imports
        !l.startsWith('//') && // comments
        !l.startsWith('importing it, you must change') && // comment in old codegen
        !l.startsWith('*'), //comments
    )
    .map(l => l.replace(/ /g, '')) // remove rest whitespaces
    .sort(); // sort alphabetically lines
}

const t1 = traverse(contents1);
const t2 = traverse(contents2);

if (t1.length !== t2.length) {
  throw new Error('Old and new codegen produces output of different size');
} else {
  for (let i = 0; i < t1.length; i++) {
    if (t1[i] !== t2[i]) {
      throw new Error(
        `Old and new codegen does not produce similar output! ${i}  ${t1[i]} | ${t2[i]}`,
      );
    }
  }
}
