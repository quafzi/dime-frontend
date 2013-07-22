var _ = require('lodash');

module.exports = {
  configRenderArgs: [
    'page:defaultRenderArgs:add',
    'gleeman:config:base',
    function(done, addRenderArg, config) {
      addRenderArg('config', config);
      done();
    },
    'page:defaultRenderArgs:get',
  ],
  // add public js
  scripts: [
    'gleeman:js:file',
    'gleeman:express:server',
    function(done, add, server) {
      add(__dirname + '/public/*.js', 100);
      done();
    },
    'page:base:scriptComplete'
  ],
  // add styles
  stylus: [
    'page:stylus:add',
    function(done, add) {
      add(__dirname, 'style/*.styl');
      done();
    },
    'page:base:styleComplete'
  ],
}
