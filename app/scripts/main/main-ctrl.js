/* global Firebase */

'use strict';

angular.module('kosh')
  .controller('MainCtrl', function ($scope, TicketService) {

    $scope.items = TicketService.getTickets();

    $scope.addItem = function() {
      TicketService.addTicket($scope.newItem);
      $scope.newItem = {};
    };

    $scope.removeItem = function(id) {
      TicketService.removeTicket(id);
    };

  });

angular.module('kosh')
  .factory('TicketService', function($firebase, FIREBASE_URI){
    var exports = {},
        ref = new Firebase(FIREBASE_URI + 'tickets'),
        sync = $firebase(ref);

    exports.getTickets = function() {
      return sync.$asObject();
    };

    exports.removeTicket = function(id) {
      sync.$remove(id);
    };

    exports.addTicket = function(ticket) {
      sync.$push(ticket);
    };

    return exports;
  });
