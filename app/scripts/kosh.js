'use strict';

var app = angular.module('kosh', ['firebase', 'ngRoute']);

app.constant('USER_ROLES', {
  GUEST: 'GUEST',
  LOGGED_IN: 'LOGGED_IN'
});

app.config(function($routeProvider, $locationProvider, USER_ROLES) {
  $locationProvider.html5Mode({requireBase:true});
  $routeProvider
    .when('/tickets', {
      templateUrl: '/templates/tickets.html',
      controller: 'TicketController',
      data: {
        accessRoles: [USER_ROLES.LOGGED_IN]
      }
    })
    .when('/tickets/:ticketId', {
      templateUrl: '/templates/ticket.html',
      controller: 'TicketController',
      data: {
        accessRoles: [USER_ROLES.LOGGED_IN]
      }
    })
    .when('/login', {
      templateUrl: '/templates/login.html',
      controller: 'LoginController',
    })
    .otherwise({
      redirectTo: '/tickets'
    });
})
.run(function($rootScope, AuthService, USER_ROLES, $location) {
  $rootScope.$on('$routeChangeStart', function(e, next) {
    if (typeof next.data !== 'undefined' && !AuthService.isAuthorized(next.data.accessRoles)) {
      $location.path('/login');
    }
  });
});
