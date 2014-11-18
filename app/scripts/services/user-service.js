/* global app */

app.factory('UserService', function($firebase, StorageService){

  'use strict';

  var exports = {},
      ref = StorageService.getRef();

  exports.get = function(id) {
    if (typeof id === 'undefined') {
      return $firebase(ref.child('users')).$asObject();
    } else {
      return $firebase(ref.child('users').child(id)).$asObject();
    }
  };

  exports.createFromGitHub = function(ghUser) {
    // exception for jshint - avatar_url is provided by GitHub
    /* jshint camelcase: false */
    var newUser = {
      id: ghUser.uid,
      name: ghUser.username,
      displayName:ghUser.displayName,
      avatarUrl: ghUser.thirdPartyUserData.avatar_url,
      provider: ghUser.provider
    };
    exports.add(newUser);
  };

  exports.remove = function(id) {
    $firebase(ref.child('users')).$remove(id);
  };

  exports.add = function(user) {
    $firebase(ref.child('users')).$set(user.id, user);
  };

  exports.exists = function(id) {
    // TODO: there got to be a better way of checking for existing data
    return $firebase(ref.child('users').child(id)).$asArray().length > 0;
  };

  return exports;
});
