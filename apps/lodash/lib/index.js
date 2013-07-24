module.exports = {
  lodash: [
    'gleeman:config:base',
    'gleeman:js:file',
    function(done, config, addJs) {
      addJs(__dirname + '/public/lodash.min.js', 900);
      done();
    },
    'page:base:scriptComplete'
  ]
};

