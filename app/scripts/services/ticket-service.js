app.factory('TicketService', function($firebase, FIREBASE_URI){

  'use strict';

  var exports = {},
      ref = new Firebase(FIREBASE_URI + 'tickets'),
      sync = $firebase(ref);

  exports.get = function(id) {
    return getSync(id).$asObject();
  };

  exports.remove = function(id) {
    getSync().$remove(id);
  };

  exports.add = function(ticket) {
    getSync().$push(ticket);
  };

  function getSync(id) {
    if (typeof id === 'undefined') {
      return sync;
    } else {
      return $firebase(new Firebase(FIREBASE_URI + 'tickets/' + id));
    }
  }

  return exports;
});
