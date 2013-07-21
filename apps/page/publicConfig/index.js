var async = require('async');
var config = {};

module.exports = {
  async: [
    function(done) {
      done(null, function(key, asyncFunc) {
        config[key] = asyncFunc;
      });
    }
  ],
  register: ['gleeman:js:asyncFunc', function(done, add) {
    add('config.js', function(addDone) {
      async.parallel(config, function(err, results) {
        addDone(null, 'var config = ' + JSON.stringify(results));
      });
    }, 1000, false);
    done();
  }, 'page:base:scriptComplete']
};


