/* global core */

core.factory('AuthService', function(StorageService, $rootScope, USER_ROLES, $location, $q){

  'use strict';

  var exports = {},
      authClient = StorageService.getAuthClient();

  exports.login = function() {
    return authClient.$login('github', {
      rememberMe: true
    });
  };

  exports.logout = function() {
    authClient.$logout();
  };

  exports.loggedIn = function() {
    return !!exports.user.uid;
  };

  exports.user = {};

  exports.isAuthorized = function(accessRoles) {
    var deferred = $q.defer();
    // TODO: This check should be more sophisticated
    if (typeof accessRoles === 'undefined') {
      deferred.resolve('Access granted');
    } else if (accessRoles.indexOf(USER_ROLES.GUEST) >= 0) {
      deferred.resolve('Access granted');
    } else if (accessRoles.indexOf(USER_ROLES.LOGGED_IN) >= 0) {
      authClient.$getCurrentUser().then(function(response) {
        if (response === null) {
          deferred.reject('Access denied! User needs to be logged in.');
        } else {
          deferred.resolve('Access granted');
        }
      });
    } else {
      deferred.reject('Access denied!');
    }
    return deferred.promise;
  };

  $rootScope.$on('$firebaseSimpleLogin:login', function(e, user) {
    angular.copy(user, exports.user);
  });

  $rootScope.$on('$firebaseSimpleLogin:logout', function() {
    angular.copy({}, exports.user);
    // Take user back to login
    $location.path('/login');
  });

  return exports;
});
