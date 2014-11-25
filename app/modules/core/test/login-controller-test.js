'use strict';

describe('login-controller', function(){
  var scope,
      AuthService,
      location,
      $q;

  beforeEach(module('kosh'));

  beforeEach(inject(function($rootScope) {
    scope = $rootScope.$new();
    scope.loggedIn = function() {
      return false;
    }
  }));

  describe('test login and logout function', function() {

    AuthService = {
      login: function() {},
      logout: jasmine.createSpy('logout')
    };

    location = {
      path: jasmine.createSpy('path')
    }

    beforeEach(inject(function($controller) {
      $controller('LoginController', {
        $scope: scope,
        $location: location,
        AuthService: AuthService
      });

    }));

    it('should call AuthService.login', function () {
      spyOn(AuthService, 'login').andReturn({then: function(){}});
      scope.login();
      expect(AuthService.login).toHaveBeenCalled();
    });

    it('should call AuthService.logout', function () {
      scope.logout();
      expect(AuthService.logout).toHaveBeenCalled();
    });

    it('should redirect to /tickets after login', inject(function ($q, $rootScope) {
      var deferred = $q.defer();
      spyOn(AuthService, 'login').andReturn(deferred.promise);
      scope.login();
      deferred.resolve();
      $rootScope.$digest();
      expect(location.path).toHaveBeenCalledWith('/tickets');
    }));

  });

});
