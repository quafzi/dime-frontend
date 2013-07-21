#!/usr/bin/env node

var run = require('gleeman')(require('./apps'));
run([
  'gleeman:commander:parse',
  function(err) {
    err && console.error(err);
  }
]);
