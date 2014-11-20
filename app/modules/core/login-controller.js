/* global core */

core.controller('LoginController', function ($scope, $location, AuthService) {

  'use strict';

  if ($scope.loggedIn()) {
    $location.path('/#tickets');
  }

  $scope.login = function() {
    AuthService.login().then(function(user){
      $location.path('/tickets');
    });
  };

  $scope.logout = function() {
    AuthService.logout();
  };

});
