var join = require('path').join;

module.exports =  {
  appsPath: join(__dirname, 'apps'),
  apps: {
    page: {
      base: ''
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
    'gleeman-commander',
    'gm-angular-templates'
  ]
};

