/* global ticket */

ticket.factory('TicketService', function($firebase, StorageService, AlertService){

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
    AlertService.add('Ticket successfully removed', 'success');
  };

  exports.add = function(ticket) {
    $firebase(ref.child('tickets')).$push(ticket);
    AlertService.add('New Ticket successfully added', 'success');
  };

  return exports;
});
