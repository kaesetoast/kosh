/* global ticket */

ticket.factory('TicketService', function($firebase, StorageService){

  'use strict';

  var exports = {},
      ref = StorageService.getRef();

  exports.get = function(id) {
    if (typeof id === 'undefined') {
      return $firebase(ref.child('tickets')).$asObject();
    } else {
      return $firebase(ref.child('tickets').child(id)).$asObject();
    }
  };

  exports.remove = function(id) {
    $firebase(ref.child('tickets')).$remove(id);
  };

  exports.add = function(ticket) {
    $firebase(ref.child('tickets')).$push(ticket);
  };

  return exports;
});
