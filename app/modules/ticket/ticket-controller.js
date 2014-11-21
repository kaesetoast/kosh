/* global ticket */

ticket.controller('TicketController',
  function ($scope, $routeParams, TicketService, UserService, $location, ModalService) {

  'use strict';

  if ($routeParams.ticketId) {
    TicketService.get($routeParams.ticketId).$bindTo($scope, 'ticket');
  } else {
    $scope.tickets = TicketService.get();
  }

  $scope.users = UserService.get();
  $scope.newTicket = {};

  $scope.priorities = [
    'minor',
    'major',
    'critical',
    'blocking'
  ];

  $scope.labels = {
    minor: 'default',
    major: 'warning',
    critical: 'danger',
    blocking: 'danger'
  };

  $scope.setPriority = function(priority) {
    $scope.ticket.priority = priority;
  };

  $scope.addTicket = function() {
    $scope.newTicket.created = new Date().toDateString();
    $scope.newTicket.author = $scope.currentUser.id;
    TicketService.add($scope.newTicket);
    $scope.newTicket = {};
    $location.path('/tickets');
  };

  $scope.removeTicket = function(id) {
    ModalService.confirm('Are you sure you want to delete this ticket?', function() {
      TicketService.remove(id);
      $location.path('/tickets');
    });
  };

  $scope.selectAssignee = function($item) {
    $scope.newTicket.assignee = $item.id;
  };

  $scope.today = function() {
    $scope.newTicket.dueto = new Date();
  };
  $scope.today();

  $scope.clear = function () {
    $scope.newTicket.dueto = null;
  };

  $scope.minDate = new Date();

});
