'use strict';
var activities;
function getActivities($http, done) {
  if (activities) {
    return done(activities);
  }
  $http.get(config.backend.url + '/activities').success(function(data, status) {
    activities = data;
    done(activities);
  });
}

var customers;
function getCustomers($http, done) {
  if (customers) {
    return done(customers);
  }
  $http.get(config.backend.url + '/customers').success(function(data, status) {
    customers = data;
    done(customers);
  });
}

var projects;
function getProjects($http, done) {
  if (projects) {
    return done(projects);
  }
  $http.get(config.backend.url + '/projects').success(function(data, status) {
    projects = data;
    done(projects);
  });
}

var services;
function getServices($http, done) {
  if (services) {
    return done(services);
  }
  $http.get(config.backend.url + '/services').success(function(data) {
    services = data
    done(services);
  });
}

var tags;
function getTags($http, done) {
  if (tags) {
    return done(tags);
  }
  $http.get(config.backend.url + '/tags').success(function(data) {
    tags = data
    done(tags);
  });
}

var timeslices;
function getTimeslices($http, done) {
  if (timeslices) {
    return done(timeslices);
  }
  $http.get(config.backend.url + '/timeslices').success(function(data, status) {
    timeslices = data;
    done(timeslices);
  });
}

function loadData($scope, $http) {
  getActivities($http, function (activities) {
    $scope.activities = activities;
  });
  getTimeslices($http, function (timeslices) {
    $scope.timeslices = timeslices;
  });
  getCustomers($http, function (customers) {
    $scope.customers = customers;
  });
  getProjects($http, function (projects) {
    $scope.projects = projects;
  });
  getServices($http, function (services) {
    $scope.services = services;
  });
  getTags($http, function (tags) {
    $scope.tags = tags;
  });
}

function NavigationCtrl($scope, $http) {
  loadData($scope, $http);
}
NavigationCtrl.$inject = ['$scope', '$http'];

function FilterCtrl($scope, $http) {
  loadData($scope, $http);
}
FilterCtrl.$inject = ['$scope', '$http'];

(function(ng) {
  var apps = [
    'tracking:base'
  ];
  var module = ng.module('dime', apps);
}(angular));

