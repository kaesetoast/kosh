'use strict';

describe('controllers', function(){
  var scope,
      currentUser,
      UserService;

  beforeEach(module('kosh'));

  beforeEach(inject(function($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should have a currentUser property', inject(function($controller) {
    // currentUser should not be defined before scope got initialized
    expect(scope.currentUser).toBeUndefined();

    $controller('ApplicationController', {
      $scope: scope
    });

    expect(scope.currentUser).toBeDefined();
  }));

  describe('test currentUser property', function() {

    beforeEach(inject(function($controller) {
      $controller('ApplicationController', {
        $scope: scope,
        UserService: UserService
      });

      currentUser = {
        uid: parseInt(Math.random()*10)
      };

      UserService = {
        exists: function(userId) {
          return userId === currentUser.uid;
        },
        createFromGitHub: function(user) {
          currentUser = 'createdFromGitHub';
        },
        get: function() {
          return currentUser;
        }
      };
    }));

    it('should get set through setCurrentUser function', function() {
      // initial state is null
      expect(scope.currentUser).toEqual(null);
      scope.setCurrentUser(currentUser);
      // check if currentUser got set properly
      expect(scope.currentUser).toBe(currentUser);
    });

    it('should get set on login event', inject(function($rootScope) {
      $rootScope.$broadcast('$firebaseSimpleLogin:login', currentUser);
      expect(scope.currentUser).toEqual(currentUser);
    }));

    it('should create a user entity if user logs in the first time', inject(function($rootScope) {
      $rootScope.$broadcast('$firebaseSimpleLogin:login', {uid: 'notsetyet'});
      expect(scope.currentUser).toBe('createdFromGitHub');
    }));

  });

});
