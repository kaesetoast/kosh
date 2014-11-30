'use strict';

describe('ticket-controller', function () {
  var scope,
      TicketServiceMock;

  beforeEach(module('kosh'));

  beforeEach(inject(function($rootScope) {
    scope = $rootScope.$new();
  }));

  describe('basics', function () {

    beforeEach(inject(function($controller) {
      $controller('TicketController', {
        $scope: scope
      });
    }));

    it('should provide a blank newTicket object', function () {
      expect(scope.newTicket).toBeDefined();
    });

    it('should provide a set of priorities', function() {
      expect(scope.priorities).toBeDefined();
    });

    it('should provide a set of labels', function () {
      expect(scope.labels).toBeDefined();
    });

    it('should provide a minDate property', function () {
      expect(scope.minDate).toBeDefined();
      expect(typeof scope.minDate).toEqual(typeof new Date());
    });

  });

  describe('single ticket state', function () {
    beforeEach(inject(function($controller) {

      TicketServiceMock = {
        get: function() {
          return {
            $bindTo: function(){}
          };
        }
      };

      spyOn(TicketServiceMock, 'get').andCallThrough();

      $controller('TicketController', {
        $scope: scope,
        $routeParams: {ticketId: 1},
        TicketService: TicketServiceMock
      });

      scope.ticket = {};

    }));

    it('should fetch single ticket if ticketId is passed', function () {
      expect(TicketServiceMock.get).toHaveBeenCalled();
    });

    it('should set priority correctly', function () {
      scope.setPriority('critical');
      expect(scope.ticket.priority).toEqual('critical');
    });

  });
});