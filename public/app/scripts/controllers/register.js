app.controller('RegisterCtrl', function ($scope, CityCamService, $rootScope, $state, SessionService, UiService) {
  $scope.register = function () {
    CityCamService.register($scope.user)
      .then(function (data, status, headers) {
        $rootScope.alert = {
          show: true,
          context: {
            type: 'success',
            msg: 'User successfully registred!'
          }
        };
        $state.go('login');
      }, function (err) {
        UiService.warningDialog('Error register', 'User already exist or user/password lenght is short');
      });
  };
});