/* global app */

app.controller('TicketsController', function ($scope, TicketService) {

  'use strict';

  $scope.tickets = TicketService.get();

  $scope.addTicket = function() {
    $scope.newTicket.created = new Date().toDateString();
    TicketService.add($scope.newTicket);
    $scope.newTicket = {};
  };

  $scope.removeTicket = function(id) {
    TicketService.remove(id);
  };

});
