/* global modals */

modals.controller('ModalController',
  function ($scope, $modalInstance) {

  'use strict';

  $scope.confirm = function() {
    $modalInstance.close();
  };

  $scope.cancel = function() {
    $modalInstance.dismiss();
  };

});

