/* global alerts */

alerts.controller('AlertController', function ($scope, AlertService) {

  'use strict';

  $scope.alerts = AlertService.alerts;

  $scope.closeAlert = function(index) {
    AlertService.remove(index);
  };

});

