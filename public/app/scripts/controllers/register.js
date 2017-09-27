app.controller('RegisterCtrl', function($scope, CityCamService, $rootScope, $state, SessionService, UiService) {
  $scope.register = function() {
    CityCamService.register($scope.user)
      .then(function(data, status, headers) {
        SessionService.storeSession(data);
        $state.go('login');
      }, function(err) {
        UiService.warningDialog('Error register', 'Username/password is incorrect.');
      });
  };
});
