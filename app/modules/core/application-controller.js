/* global core */

core.controller('ApplicationController', function ($scope, AuthService) {

  'use strict';

  $scope.currentUser = null;
  $scope.loggedIn = AuthService.loggedIn;
  $scope.isAuthorized = AuthService.isAuthorized;

  $scope.setCurrentUser = function(user) {
    $scope.currentUser = user;
  };

});
