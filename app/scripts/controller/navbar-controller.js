/* global app */

app.controller('NavbarController', function ($scope, AuthService) {

  'use strict';

  $scope.user = AuthService.user;
  $scope.loggedIn = AuthService.loggedIn;
  $scope.login = AuthService.login;
  $scope.logout = AuthService.logout;

});
