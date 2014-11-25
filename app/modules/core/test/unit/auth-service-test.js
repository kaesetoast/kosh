'use strict';

describe('auth-service', function () {

  var AuthService,
      StorageService,
      StorageServiceMock,
      authClientMock = {
        $login: function(){},
        $logout: function(){},
        $getCurrentUser: function(){}
      };

  beforeEach(module('kosh'));

  beforeEach(module(function($provide) {
    StorageServiceMock = {
      getAuthClient: function() {
        return authClientMock;
      }
    };
    $provide.value('StorageService', StorageServiceMock);
  }));

  beforeEach(inject(function(_AuthService_, _StorageService_) {
    AuthService = _AuthService_;
    StorageService = _StorageService_;
  }));

  describe('test login and logout', function() {

    it('should call $login on the authClient object', function() {
      spyOn(authClientMock, '$login');
      AuthService.login();
      expect(authClientMock.$login).toHaveBeenCalledWith('github', {rememberMe: true});
    });

    it('should call $logout on the authClient object', function() {
      spyOn(authClientMock, '$logout');
      AuthService.logout();
      expect(authClientMock.$logout).toHaveBeenCalled();
    });

    it('should tell that user is logged in when uid is present', function() {
      AuthService.user = {
        uid: 123
      };
      expect(AuthService.loggedIn()).toBe(true);
    });

    it('should tell that user is logged out when uid is not present', function() {
      AuthService.user = {};
      expect(AuthService.loggedIn()).toBe(false);
    });

  });

  describe('test authorization', function () {

    var USER_ROLES,
        $q,
        $rootScope;

    beforeEach(inject(function(_USER_ROLES_, _$q_, _$rootScope_) {
      USER_ROLES = _USER_ROLES_;
      $q = _$q_;
      $rootScope = _$rootScope_;
    }));

    describe('test rules that require user to be logged in', function() {

      it('should deny access if user is not logged in', function() {
        var deferred = $q.defer(),
            catchHandler = jasmine.createSpy('catchHandler');
        spyOn(authClientMock, '$getCurrentUser').andReturn(deferred.promise);
        AuthService.isAuthorized(USER_ROLES.LOGGED_IN).catch(catchHandler);
        deferred.resolve(null);
        $rootScope.$digest();
        expect(catchHandler).toHaveBeenCalled();
      });

      it('should grant access if user is logged in', function() {
        var deferred = $q.defer(),
            thenHandler = jasmine.createSpy('thenHandler');
        spyOn(authClientMock, '$getCurrentUser').andReturn(deferred.promise);
        AuthService.isAuthorized(USER_ROLES.LOGGED_IN).then(thenHandler);
        deferred.resolve('some user');
        $rootScope.$digest();
        expect(thenHandler).toHaveBeenCalled();
      });

    });

  });

});
