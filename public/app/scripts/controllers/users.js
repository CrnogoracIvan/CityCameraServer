app.controller('UserCtrl', function ($scope, $location, CityCamService, $rootScope, $state, SessionService, UiService) {

    CityCamService.listUsers()
        .then(function (data, status, headers) {
                $scope.listUsers = data.data;
            },
            function (err) {
                UiService.warningDialog('Error create', 'Forbiden access');
            });


    $scope.update = function (user, index) {
        user.isAdmin = !user.isAdmin;
        CityCamService.update(user)
            .then(function (data, status, headers) {
                    $scope.listUsers[index] = data.data;
                },
                function (err) {
                    UiService.warningDialog('Error create', 'Forbiden access');
                });
    }

});