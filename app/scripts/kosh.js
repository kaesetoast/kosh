'use strict';

var app = angular.module('kosh', ['firebase', 'ngRoute']);

app.config(function($routeProvider) {
  $routeProvider
    .when('/tickets', {
      templateUrl: 'templates/tickets.html',
      controller: 'TicketController'
    })
    .when('/tickets/:ticketId', {
      templateUrl: 'templates/ticket.html',
      controller: 'TicketController'
    })
    .when('/login', {
      templateUrl: 'templates/login.html',
      controller: 'LoginController',
      resolve: {
        user: function(AuthService) {
          return AuthService.getCurrentUser();
        }
      }
    })
    .otherwise({
      redirectTo: '/tickets'
    });
});
