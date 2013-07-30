module.exports = {
  server: [
    'gleeman:config:base',
    'gleeman:express:express',
    'gleeman:express:server',
    'page:defaultRenderArgs:get',
    function(done, config, express, expressServer, renderArgs) {
      var server = express();

      server.set('views', __dirname + '/views');
      server.set('view engine', 'jade');
      server.get('/', function(req, res) {
        var args = renderArgs(req);
        req.lastname = args.lastname;
        res.render('index', args);
      });
      expressServer.use(server);
      done(null, server);
  }, 'page:base:server'],
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
  ]
}
