/* global navbar */

navbar.controller('NavbarController', function ($scope, AuthService) {

  'use strict';

  $scope.logout = AuthService.logout;

});
