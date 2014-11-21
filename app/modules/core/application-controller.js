/* global core */

core.controller('ApplicationController', function ($scope, AuthService, UserService) {

  'use strict';

  $scope.currentUser = null;
  $scope.loggedIn = AuthService.loggedIn;
  $scope.isAuthorized = AuthService.isAuthorized;

  $scope.setCurrentUser = function(user) {
    $scope.currentUser = user;
  };

  $scope.$on('$firebaseSimpleLogin:login', function(e, user) {
    if (!UserService.exists(user.uid)) {
      UserService.createFromGitHub(user);
    }
    $scope.setCurrentUser(UserService.get(user.uid));
  });

});
