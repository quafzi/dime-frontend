'use strict';

function TrackingCtrl($scope, $http) {
  loadData($scope, $http);
}
FilterCtrl.$inject = ['$scope', '$http'];

(function(ng) {
  var NS = 'tracking:base';
  var module = ng.module(NS, []);
  module.filter('formatDuration', function() {
    return function(seconds) {
      return moment().diff(seconds, 'seconds');
    }
  });
}(angular));
