/* global alerts */

alerts.factory('AlertService', function($timeout) {

  'use strict';

  var AlertService = {};

  AlertService.alerts = [];

  AlertService.add = function(message, type) {
    var newAlert = {type: type, msg: message};
    AlertService.alerts.push(newAlert);
    $timeout(function() {
      autoRemove(newAlert);
    }, 5000);
  };

  AlertService.remove = function(id) {
    if (typeof AlertService.alerts[id] !== 'undefined') {
      AlertService.alerts.splice(id, 1);
    }
  };

  function autoRemove(alert) {
    AlertService.remove(AlertService.alerts.indexOf(alert));
  }

  return AlertService;
});
