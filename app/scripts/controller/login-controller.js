/* global app */

app.controller('LoginController', function ($scope, $location, AuthService, user, UserService) {

  'use strict';

  if (user) {
    $location.path('/#tickets');
  }

  $scope.login = function() {
    AuthService.login().then(function() {
      if (!UserService.exists(AuthService.user.uid)) {
        UserService.add(AuthService.user);
      }
      $location.path('#/tickets');
    });
  };

  $scope.logout = function() {
    AuthService.logout();
  };

});
