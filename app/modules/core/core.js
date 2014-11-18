/* global app */

var core = angular.module('kosh.core', []);

core.constant('USER_ROLES', {
  GUEST: 'GUEST',
  LOGGED_IN: 'LOGGED_IN'
});

core.config(function($routeProvider, USER_ROLES) {
  $routeProvider
    .when('/login', {
      templateUrl: '/modules/core/login.html',
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

