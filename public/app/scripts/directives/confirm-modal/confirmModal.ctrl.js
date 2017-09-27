app.controller('ConfirmController', function($scope, $uibModalInstance, data) {
  $scope.title   = data.title;
  $scope.message = data.message;

  $scope.ok     = function() {
    $uibModalInstance.close('ok');
  };
  $scope.cancel = function() {
    $uibModalInstance.dismiss('cancel');
  };
});
