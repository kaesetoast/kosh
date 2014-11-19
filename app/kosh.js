'use strict';

var app = angular.module('kosh', [
  'firebase',
  'ngRoute',
  'kosh.core',
  'kosh.navbar',
  'kosh.user',
  'kosh.ticket'
]);

app.config(function($locationProvider) {
  // $locationProvider.html5Mode({requireBase:true});
});
