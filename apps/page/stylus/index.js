var express = require('express');
var _ = require('lodash');
var glob = require('glob');
var join = require('path').join;

var files = {};

// method collects one configuration path from all apps and merges it
// TODO move to seperate config module
var collect = _.memoize(function collect(includefullPath) {
  var collection = [];
  _(files).each(function(globs, path) {
    var files = [];
    globs = _.isArray(globs) ? globs : [globs];
    if ('' === path) {
      files = globs;
    } else {
      files = globs.map(function(globString) {
        return glob.sync(join(path, globString));
      });
    }
    // remove base path from files
    if (!includefullPath) {
      files = _.flatten(files).map(function(fileName) {
        return fileName.replace(path, '');
      });
    }
    collection.push(files);
  });
  collection = _.flatten(collection);
  return collection;
});

// method to generate css from stylus source
var renderCss = function renderCss() {
  var stylus = require('stylus')('');
  stylus.use(require('nib')());
  collect(true).forEach(function(file) {
    console.log('adding ' + file + ' to stylus');
    stylus.import(file);
  });
  return stylus.render();
};

//////////////////// APP API ////////////////////  

var addFile = function(cb) {
  cb(null, function(path, globs) {
    files[path] = globs;
  });
};

var getFiles = function(cb) {
  cb(null, collect);
};

var registerCss = function(cb, addCss) {
  addCss('stylus.css', renderCss, -1000);
  cb();
};

var base = function(cb, add) {
  add(__dirname, 'base.styl');
  cb(null);
};

module.exports = {
  add: addFile,
  get: getFiles,
  register: ['gleeman:css:func', registerCss, 'page:base:styleComplete'],
  base: ['page:stylus:add', base, 'page:base:server']
};
