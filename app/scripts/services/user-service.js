/* global app */

app.factory('UserService', function($firebase, AuthService){

  'use strict';

  var exports = {},
      ref = AuthService.getRef();

  exports.get = function(id) {
    if (typeof id === 'undefined') {
      return $firebase(ref.child('users')).$asObject();
    } else {
      return $firebase(ref.child('users').child(id)).$asObject();
    }
  };

  exports.remove = function(id) {
    $firebase(ref.child('users')).$remove(id);
  };

  exports.add = function(user) {
    $firebase(ref.child('users')).$set(user.uid, user);
  };

  exports.exists = function(id) {
    // TODO: there got to be a better way of checking for existing data
    return $firebase(ref.child('users').child(id)).$asArray().length > 0;
  };

  return exports;
});
