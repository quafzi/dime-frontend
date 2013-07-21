var join = require('path').join;

module.exports =  {
  appsPath: join(__dirname, 'apps'),
  apps: {
    home: {
      base: ''
    },
    page: {
      base: '',
      defaultRenderArgs: '',
      stylus: '',
      publicConfig: ''
    },
    angular: {
      lib: '',
    },
  },
  packages: [
    'gleeman-config',
    'gleeman-express',
    'gleeman-express-http',
    'gleeman-express-css',
    'gleeman-express-js',
    'gleeman-commander'
  ]
};
