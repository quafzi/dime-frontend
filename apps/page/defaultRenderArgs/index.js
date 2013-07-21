var _ = require('lodash');

var args = {};

module.exports = {
  add: function(done) {
    done(null, function(key, value, req) {
      if (req) {
        req.renderArgs = req.renderArgs || {};
        req.renderArgs[key] = value;
      } else {
        args[key] = value;
      }
    });
  },
  get: function(done) {
    done(null, function(req) {
      if (req && req.renderArgs) {
        return _.extend(req.renderArgs, args);
      } else {
        return args;
      }
    });
  }
};

