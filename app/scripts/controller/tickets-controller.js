/* global app */

app.controller('TicketsController', function ($scope, TicketService) {

  'use strict';

  $scope.tickets = TicketService.get();

  $scope.addTicket = function() {
    TicketService.add($scope.newItem);
    $scope.newItem = {};
  };

  $scope.removeTicket = function(id) {
    TicketService.remove(id);
  };

});
