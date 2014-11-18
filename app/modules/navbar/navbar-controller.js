/* global app */

navbar.controller('NavbarController', function ($scope, AuthService) {

  'use strict';

  $scope.logout = AuthService.logout;

});
