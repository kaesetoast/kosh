'use strict';

var app = angular.module('kosh', ['firebase', 'ngRoute']);

app.config(function($routeProvider) {
  $routeProvider
    .when('/tickets', {
      templateUrl: 'templates/tickets.html',
      controller: 'TicketsController'
    })
    .when('/tickets/:ticketId', {
      templateUrl: 'templates/ticket.html',
      controller: 'TicketController'
    })
    .otherwise({
      redirectTo: '/tickets'
    });
});
