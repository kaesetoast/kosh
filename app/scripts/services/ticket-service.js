/* global app */

app.factory('TicketService', function($firebase, AuthService){

  'use strict';

  var exports = {},
      ref = AuthService.getRef();

  exports.get = function() {
    return $firebase(ref.child('tickets')).$asObject();
  };

  exports.remove = function(id) {
    $firebase(ref.child('tickets')).$remove(id);
  };

  exports.add = function(ticket) {
    ticket.author = AuthService.user.uid;
    $firebase(ref.child('tickets')).$push(ticket);
  };

  return exports;
});
