'use strict';

var app = angular.module('kosh', ['firebase', 'ngRoute']);

app.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'templates/tickets.html',
      controller: 'MainCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });
});

app.constant('FIREBASE_URI', 'https://sizzling-inferno-7416.firebaseio.com/');
