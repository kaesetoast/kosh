/* global app */

'use strict';

app.controller('TicketsController', function ($scope, TicketService) {

  $scope.tickets = TicketService.get();

  $scope.addTicket = function() {
    TicketService.add($scope.newItem);
    $scope.newItem = {};
  };

  $scope.removeTicket = function(id) {
    TicketService.remove(id);
  };

});
