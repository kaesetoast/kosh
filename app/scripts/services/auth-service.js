/* global app */
/* global Firebase */

app.factory('AuthService', function($firebase, $firebaseSimpleLogin, $rootScope, USER_ROLES, SessionService){

  'use strict';

  var exports = {},
      ref = new Firebase('https://sizzling-inferno-7416.firebaseio.com'),
      authClient = $firebaseSimpleLogin(ref);

  exports.getCurrentUser = function() {
    return authClient.$getCurrentUser();
  };

  exports.login = function() {
    return authClient.$login('github');
  };

  exports.logout = function() {
    authClient.$logout();
  };

  exports.loggedIn = function() {
    return !!SessionService.userId;
  };

  exports.getRef = function() {
    return ref;
  };

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

  exports.user = {};

  $rootScope.$on('$firebaseSimpleLogin:login', function(e, user) {
    angular.copy(user, exports.user);
    SessionService.create(new Date(), user.uid);
  });

  $rootScope.$on('$firebaseSimpleLogin:logout', function() {
    angular.copy({}, exports.user);
    SessionService.destroy();
  });

  return exports;
});
