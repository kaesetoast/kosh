'use strict';

var app = angular.module('kosh', [
  'firebase',
  'ngRoute',
  'ui.bootstrap',
  'kosh.core',
  'kosh.navbar',
  'kosh.modals',
  'kosh.user',
  'kosh.ticket'
]);

app.config(function($locationProvider) {
  // $locationProvider.html5Mode({requireBase:true});
});
