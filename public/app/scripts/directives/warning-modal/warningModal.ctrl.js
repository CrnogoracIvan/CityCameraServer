app.controller('WarningController', function($scope, $uibModalInstance, data) {
  $scope.title   = data.title;
  $scope.message = data.message;

  $scope.ok = function() {
    $uibModalInstance.close('ok');
  };
});
