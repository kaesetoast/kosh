/* global app */

app.controller('TicketController', function ($scope, $routeParams, TicketService, UserService, AuthService) {

  'use strict';

  if ($routeParams.ticketId) {
    $scope.ticket = TicketService.get($routeParams.ticketId);
  } else {
    $scope.tickets = TicketService.get();
  }

  $scope.addTicket = function() {
    $scope.newTicket.created = new Date().toDateString();
    TicketService.add($scope.newTicket);
    $scope.newTicket = {};
  };

  $scope.removeTicket = function(id) {
    TicketService.remove(id);
  };

});
