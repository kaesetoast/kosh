'use strict';

var core = angular.module('kosh.core', []);

core.constant('USER_ROLES', {
  GUEST: 'GUEST',
  LOGGED_IN: 'LOGGED_IN'
});

core.config(function($routeProvider) {
  $routeProvider
    .when('/login', {
      templateUrl: '/modules/core/views/login.html',
      controller: 'LoginController',
    })
    .otherwise({
      redirectTo: '/tickets'
    });
})
.run(function($rootScope, AuthService, $location) {
  $rootScope.$on('$routeChangeStart', function(e, next) {
    // if there are restrictions for the desired url, check them
    if (typeof next.data !== 'undefined') {
      AuthService.isAuthorized(next.data.accessRoles).catch(function() {
        $location.path('/login');
      });
    }
  });
});

