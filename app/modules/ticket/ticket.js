/* exported ticket */

'use strict';

var ticket = angular.module('kosh.ticket', ['nl2br', 'ngSanitize'])
  .config(function($routeProvider, USER_ROLES) {
    $routeProvider
      .when('/tickets', {
        templateUrl: '/modules/ticket/tickets.html',
        controller: 'TicketController',
        data: {
          accessRoles: [USER_ROLES.LOGGED_IN]
        }
      })
      .when('/tickets/:ticketId', {
        templateUrl: '/modules/ticket/ticket.html',
        controller: 'TicketController',
        data: {
          accessRoles: [USER_ROLES.LOGGED_IN]
        }
      });
  });
