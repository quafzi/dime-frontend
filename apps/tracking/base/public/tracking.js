'use strict';

function TrackingCtrl($scope, $http) {
  loadData($scope, $http);

  $scope.applyFilter = function(activity) {
    console.log($scope.filter);
    if ('undefined' == typeof($scope.filter)) {
      return true;
    }

    if ('object' === typeof($scope.filter.customer)
      && null !== $scope.filter.customer
    ) {
      if (activity.customer.id !== $scope.filter.customer.id) {
        return false;
      }
    }

    if ('object' === typeof($scope.filter.project)
      && null !== $scope.filter.project
    ) {
      if (activity.project.id !== $scope.filter.project.id) {
        return false;
      }
    }

    if ('object' === typeof($scope.filter.service)
      && null !== $scope.filter.service
    ) {
      if (activity.service.id !== $scope.filter.service.id) {
        return false;
      }
    }

    if ('object' === typeof($scope.filter.tag)
      && null !== $scope.filter.tag
    ) {
      if (activity.tag.id !== $scope.filter.tag.id) {
        return false;
      }
    }

    return true;
  }
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
