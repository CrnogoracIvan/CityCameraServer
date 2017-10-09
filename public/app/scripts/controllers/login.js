app.controller('LoginCtrl', function($scope, $location,CityCamService, $rootScope, $state, SessionService, UiService) {

  $scope.login = function() {  
    CityCamService.login($scope.user)
      .then(function(data, status, headers) {
        SessionService.storeSession(data.data.data);
        $scope.logedUser =data.data.data.username;
       $state.go('dashboard');  
      }, function(err) {
       UiService.warningDialog('Error login', 'Username/password is incorrect.');
      });
  };
});
