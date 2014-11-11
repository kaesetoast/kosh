/* global app */

app.controller('LoginController', function ($scope, $location, AuthService, user) {

  'use strict';

  if (user) {
    $location.path('/#tickets');
  }

  $scope.login = function() {
    AuthService.login().then(function() {
      $location.path('#/tickets');
    });
  };

  $scope.logout = function() {
    AuthService.logout();
  };

});
