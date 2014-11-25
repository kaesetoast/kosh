'use strict';

describe('auth-service', function () {

  var AuthService,
      StorageService,
      StorageServiceMock,
      authClientMock = jasmine.createSpyObj('authClient', [
        '$login',
        '$logout'
      ]);

  beforeEach(module('kosh'));

  describe('test login and logout', function() {

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

    it('should call $login on the authClient object', function() {
      AuthService.login();
      expect(authClientMock.$login).toHaveBeenCalledWith('github', {rememberMe: true});
    });

    it('should call $logout on the authClient object', function() {
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

});
