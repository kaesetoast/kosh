/* global core */
/* global Firebase */

core.factory('StorageService', function($firebase, $firebaseSimpleLogin){

  'use strict';

  var exports = {},
      ref = new Firebase('https://sizzling-inferno-7416.firebaseio.com'),
      authClient = $firebaseSimpleLogin(ref);

  exports.getRef = function() {
    return ref;
  };

  exports.getAuthClient = function() {
    return authClient;
  };

  return exports;
});
