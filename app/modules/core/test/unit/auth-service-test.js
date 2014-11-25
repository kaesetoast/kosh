'use strict';

describe('auth-service', function () {

  var AuthService,
      StorageService,
      StorageServiceMock,
      loginMock = jasmine.createSpyObj('authClient', [
        '$login'
      ]);

  beforeEach(module('kosh'));

  describe('test login', function() {

    beforeEach(module(function($provide) {
      StorageServiceMock = {
        getAuthClient: function() {
          return loginMock;
        }
      };
      $provide.value('StorageService', StorageServiceMock);
    }));

    beforeEach(inject(function(_AuthService_, _StorageService_) {
      AuthService = _AuthService_;
      StorageService = _StorageService_;
    }));

    it('should call $login on the authClient object', function() {
      spyOn(StorageServiceMock, 'getAuthClient').andCallThrough();
      AuthService.login();
      expect(loginMock.$login).toHaveBeenCalledWith('github', {rememberMe: true});
    });

  });

});
