module.exports = {
  server: [
    'gleeman:config:base',
    'gleeman:express:express',
    'gleeman:express:server',
    function(done, config, express, expressServer) {
      server = express();

      server.get('/', function(req, res) {
        var args = renderArgs(req);
        req.lastname = args.lastname;
        res.setHeader('Access-Control-Allow-Origin', '*');
        console.log('Allow to access ' + config.backend.url)
        res.render('index', args);
      });
      expressServer.use(server);
      done(null, server);
  }, 'page:base:server'],

