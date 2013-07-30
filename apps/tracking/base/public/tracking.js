'use strict';

function TrackingCtrl($scope, $http) {
  loadData($scope, $http);

  $scope.applyFilter = function(activity) {
    if ('undefined' == typeof($scope.filter)) {
      return true;
    }

    if ('string' === typeof($scope.filter.search)
      && -1 === activity.description.indexOf($scope.filter.search)
    ) {
      return false;
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

function ActivityCtrl($scope, $http) {
  $scope.toggleRunning = function() {
    timeslices = $scope.activity.timeslices;
    if ($scope.isRunning()) {
      timeslices[0].stopped_at = new Date();
      timeslices[0].duration   = 7777;
      var url = config.backend.url + '/timeslices/' + timeslices[0].id;
      $http.put(url, timeslices[0]).success(function(timeslice) {
        $scope.timeslices[0] = timeslice;
      });
    } else {
      var newTimeslice = {
        activity_id: $scope.activity.id,
        started_at:  new Date()
      }
      console.log(newTimeslice)
      var url = config.backend.url + '/timeslices';
      $http.post(url, newTimeslice).success(function(newTimeslice) {
        $scope.timeslices.unshift(newTimeslice);
      });
    }
  }

  $scope.isRunning = function() {
    return _.some($scope.activity.timeslices, function(timeslice) {
      return _.isUndefined(timeslice.duration)
        || _.isNull(timeslice.duration)
        || 0 === timeslice.duration;
    });
  }
}
ActivityCtrl.$inject = ['$scope', '$http'];

(function(ng) {
  var NS = 'tracking:base';
  var module = ng.module(NS, []);
  module.filter('formatHours', function() {
    return function(seconds) {
      return Math.round(
        moment.duration(seconds, 'seconds').asHours() * 100
      )/100;
    }
  });
  module.filter('sumDuration', function() {
    return function(timeslices) {
      var duration = 0;
      _.each(timeslices, function(timeslice) {
        duration += timeslice.duration;
      })
      duration = moment.duration(duration, 'seconds');
      var hours = Math.floor(duration.asHours()),
          minute = duration.minutes(),
          second = duration.seconds();

      if (hours<10) {
          hours = '0' + hours;
      }
      if (minute<10) {
          minute = '0' + minute;
      }
      if (second<10) {
          second = '0' + second;
      }

      return [hours, minute, second].join(':');
    }
  });
}(angular));
