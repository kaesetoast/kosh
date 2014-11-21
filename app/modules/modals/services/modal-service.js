/* global modals */

modals.factory('ModalService', function($modal, $rootScope){

  'use strict';

  var ModalService = {};

  ModalService.confirm = function(message, successCallback, cancelCallback) {
    $rootScope.koshModalServiceConfirmMessage = message;
    var modalInstance = $modal.open({
      templateUrl: '/modules/modals/confirm.html',
      controller: 'ModalController'
    });
    modalInstance.result.then(successCallback, cancelCallback);
  };

  return ModalService;
});
