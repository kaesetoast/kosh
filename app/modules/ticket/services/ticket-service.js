/* global ticket */

ticket.factory('TicketService', function($firebase, StorageService, AlertService){

  'use strict';

  var TicketService = {},
      ref = StorageService.getRef();

  TicketService.get = function(id) {
    if (typeof id === 'undefined') {
      return $firebase(ref.child('tickets')).$asObject();
    } else {
      return $firebase(ref.child('tickets').child(id)).$asObject();
    }
  };

  TicketService.remove = function(id) {
    $firebase(ref.child('tickets')).$remove(id);
    AlertService.add('Ticket successfully removed', 'success');
  };

  TicketService.add = function(ticket) {
    $firebase(ref.child('tickets')).$push(ticket);
    AlertService.add('New Ticket successfully added', 'success');
  };

  return TicketService;
});
