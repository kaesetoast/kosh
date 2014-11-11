/* global app */
/* global Firebase */

app.factory('AuthService', function($firebase, $firebaseSimpleLogin, $rootScope){

  'use strict';

  var exports = {},
      ref = new Firebase('https://sizzling-inferno-7416.firebaseio.com'),
      authClient = $firebaseSimpleLogin(ref);

  exports.getCurrentUser = function() {
    return authClient.$getCurrentUser();
  };

  exports.login = function() {
    return authClient.$login('github', {
      preferRedirect: true
    });
  };

  exports.logout = function() {
    authClient.$logout();
  };

  exports.loggedIn = function() {
    return !!exports.user.provider;
  };

  exports.getRef = function() {
    return ref;
  };

  exports.user = {};

  $rootScope.$on('$firebaseSimpleLogin:login', function(e, user) {
    angular.copy(user, exports.user);
  });

  $rootScope.$on('$firebaseSimpleLogin:logout', function() {
    angular.copy({}, exports.user);
  });

  return exports;
});
