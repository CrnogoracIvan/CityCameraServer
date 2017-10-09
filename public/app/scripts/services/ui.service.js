app.service('UiService', function($rootScope, $window, SessionService, $http, $state, $uibModal) {
  // All UI configs that are kept in localStorage should be restored from here
  return {
    init: function() {
      $rootScope.alerts = [];
      $rootScope.logout = function() {
        SessionService.destroySession();
      };
    },
    warningDialog: function(title, message) {
      //confirmation modal
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'partials/warning-modal.html',
        controller: 'WarningController',
        resolve: {
          data: function() {
            return {
              title: title,
              message: message
            };
          }
        }
      });
    },
    confirmDialog: function(title, message, clb) {
      //confirmation modal
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'partials/confirm-modal.html',
        controller: 'ConfirmController',
        resolve: {
          data: function() {
            return {
              title: title,
              message: message
            };
          }
        }
      });

      modalInstance.result.then(function() {
        clb(true);
      }, function() {
        clb(false);
      });
    }
  };
});

