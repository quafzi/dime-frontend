var _ = require('lodash');

module.exports = {
  // provide session support
  session: [
    'gleeman:config:base',
    'gleeman:express:express',
    'gleeman:express:server',
    function(done, config, express, server) {
      server.use(express.cookieParser());
      server.use(express.session({
        key:    config.security.cookiePath,
        secret: config.security.secret,
      }));
      done();
    },
    'page:base:server'
  ],

  server: [
    'gleeman:express:server',
    function(done, server) {
      done(null, server);
    },
    'gleeman:http:start'
  ],

  staticFiles: [
    'gleeman:express:express',
    'gleeman:express:server',
    function(done, express, expressServer) {
      expressServer.use('/style/apps/page/base/img/', express.static(__dirname + '/public'));
      done();
    },
    'page:base:scriptComplete',
    'page:base:styleComplete'
  ],

  // handle styles (fonts, css, ...)
  style: ['gleeman:css:file', 'gleeman:css:link',
    function(done, file, link) {
      link('//fonts.googleapis.com/css?family=Advent+Pro:400,700');
      link('//fonts.googleapis.com/css?family=Armata:400');
      file(__dirname + '/public/*.css');
      done();
    },
    'page:base:styleComplete'
  ],

  // allow stylus usage
  stylus: [
    'page:stylus:add',
    function(done, add) {
      add(__dirname, 'style/*.styl');
      done();
    },
    'page:base:styleComplete'
  ],

  // handle public js
  scripts: [
    'gleeman:js:file',
    function(done, add) {
      add(__dirname + '/public/*.js', 100);
      done();
    },
    'page:base:scriptComplete'
  ],

  scriptComplete: [
    'page:defaultRenderArgs:add',
    'gleeman:js:sorted',
    'gleeman:config:base',
    'gleeman:js:server',
    'gleeman:js:combine',
    function(done, addRenderArg, getScripts, config) {
      var scripts = _.filter(getScripts(), function(script) {
        return script.type === 'link'
            || !config.script.combine
            || !script.combine;
      });
      addRenderArg('scripts', scripts);
      done();
    },
    'page:defaultRenderArgs:get'
  ],

  styleComplete: [
    'page:defaultRenderArgs:add',
    'gleeman:css:sorted',
    'gleeman:config:base',
    'gleeman:css:server',
    'gleeman:css:combine',
    function(done, addRenderArg, getStyles, config) {
      addRenderArg('styles', _.filter(getStyles(), function(style) {
        return style.combine !== config.style.combine || style.type === 'link';
      }));
      done();
    },
    'page:defaultRenderArgs:get'
  ],
  publicConfig: [
    'page:publicConfig:async',
    'gleeman:config:base',

    function(done, addConfig, config) {
      _.each(
        ['backend'],
        function (item) {
          addConfig(item, function(done) {
            done(null, config[item]);
          });
        }
      );
      done();
    },
    'page:publicConfig:register'
  ],
}
