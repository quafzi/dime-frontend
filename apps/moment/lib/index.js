module.exports = {
  momentjs: [
    'gleeman:config:base',
    'gleeman:js:file',
    function(done, config, addJs) {
      addJs(__dirname + '/public/moment.min.js', 900);
      done();
    },
    'page:base:scriptComplete'
  ]
};

