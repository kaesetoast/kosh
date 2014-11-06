'use strict';

var app = angular.module('kosh', ['firebase', 'ngRoute']);

app.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'templates/tickets.html',
      controller: 'TicketsController'
    })
    .when('/tickets/:ticketId', {
      templateUrl: 'templates/ticket.html',
      controller: 'TicketController'
    })
    .otherwise({
      redirectTo: '/'
    });
});

app.constant('FIREBASE_URI', 'https://sizzling-inferno-7416.firebaseio.com/');
