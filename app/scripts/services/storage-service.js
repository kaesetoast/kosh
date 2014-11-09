/* global app */
/* global Firebase */

app.factory('StorageService', function($firebase, $firebaseSimpleLogin){

  'use strict';

  var exports = {},
      ref = new Firebase('https://sizzling-inferno-7416.firebaseio.com'),
      authClient = $firebaseSimpleLogin(ref);

  exports.loginWithGitHub = function() {
    authClient.$login('github', {
      preferRedirect: true
    }).then(function(user){
      console.log('user logged in as ' + user.id);
    }, function(error){
      console.error('login failed: ' + error);
    });
  };

  return exports;
});
