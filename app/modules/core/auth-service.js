/* global core */

core.factory('AuthService', function(StorageService, $rootScope, USER_ROLES, $location, UserService){

  'use strict';

  var exports = {},
      authClient = StorageService.getAuthClient();

  exports.login = function() {
    return authClient.$login('github');
  };

  exports.logout = function() {
    authClient.$logout();
  };

  exports.loggedIn = function() {
    return !!exports.user.uid;
  };

  exports.getCurrentUser = function() {
    if (exports.loggedIn()) {
      return UserService.get(exports.user.uid);
    } else {
      return {};
    }
  };

  exports.user = {};

  exports.isAuthorized = function(accessRoles) {
    // TODO: This check should be more sophisticated
    if (typeof accessRoles === 'undefined') {
      return true;
    } else if (accessRoles.indexOf(USER_ROLES.GUEST) >= 0) {
      return true;
    } else if (accessRoles.indexOf(USER_ROLES.LOGGED_IN) >= 0 && exports.loggedIn()) {
      return true;
    } else {
      return false;
    }
  };

  $rootScope.$on('$firebaseSimpleLogin:login', function(e, user) {
    angular.copy(user, exports.user);
    if (!UserService.exists(user.uid)) {
      UserService.createFromGitHub(exports.user);
    }
  });

  $rootScope.$on('$firebaseSimpleLogin:logout', function() {
    angular.copy({}, exports.user);
    // Take user back to login
    $location.path('/login');
  });

  return exports;
});
