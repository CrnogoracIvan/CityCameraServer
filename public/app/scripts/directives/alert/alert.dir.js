app.directive('alerts', function() {
  return {
    restrict: 'E',
    templateUrl: 'partials/alert.html',
    replace: true,
    controller: function($scope, $timeout) {
      $scope.$watch('alert', function(val) {
        if (!val || !val.show) {
          return;
        }
        $timeout(function() {
          $scope.$root.alert.show = false;
        }, 3000);
      });
    }
  };
});
