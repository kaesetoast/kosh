/* global app */

'use strict';

app.controller('TicketController', function ($scope, $routeParams, TicketService) {

  $scope.ticket = TicketService.get($routeParams.ticketId);

});
