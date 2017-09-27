app.controller('TodoCtrl', function($scope) {
  $scope.todos = [{
    'title': 'Naparavi todo app',
    'done': false
  }];

  $scope.addTodo = function() {
    $scope.todos.push({ 'title': $scope.newTodo, 'done': false })
    $scope.newTodo = '';
  };

  $scope.delete = function(id) {
    if (confirm("Do you want delete this file?")) {
      $scope.todos.splice(id, 1);
    };
  }

});
