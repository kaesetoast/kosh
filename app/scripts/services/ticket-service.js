/* global app */

app.factory('TicketService', function(StorageService){

  'use strict';

  var exports = {};

  exports.get = function() {
    StorageService.loginWithGitHub();
    // return getSync(id).$asObject();
  };

  exports.remove = function(id) {
    getSync().$remove(id);
  };

  exports.add = function(ticket) {
    getSync().$push(ticket);
  };

  function getSync(id) {
    if (typeof id === 'undefined') {
      // return sync;
    } else {
      // return $firebase(new Firebase(FIREBASE_URI + 'tickets/' + id));
    }
  }

  return exports;
});
