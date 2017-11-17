app.controller('FolderCtrl', function ($scope, CityCamService, $rootScope, $state, SessionService, UiService) {
  //set inital folder path
  $scope.folder = '/';

  //set default view type
  $scope.viewType = 'list';

  //hide/show img for local or s3 storage
  $scope.localImg = false;
  $scope.s3Img = true;
  $scope.btnIsActive = false;

  //list all folder - admin can see
  CityCamService.folder($scope.user)
    .then(function (result, status, headers) {
      if ($scope.user.isAdmin) {
        $scope.folders = result.data.folders;
      } else {
        //List folders by userId
        CityCamService.folderByUserId($scope.user._id)
          .then(function (data, status, headers) {
              if (!$scope.user.isAdmin) {
                $scope.folders = data.data.folders;
              }
            },
            function (err) {
              UiService.warningDialog('Error create', 'Forbiden access');
            });
      }
    }, function (err) {
      UiService.warningDialog('Forbiden access');
    });

  $scope.listFiles = function (folder,status) {

    $scope.selected = 0;

    $scope.select = function (index) {
      $scope.selected = index;
    };

    $scope.folder = folder;

    //List file
    CityCamService.listFiles(folder)
      .then(function (data) {
        $scope.btnIsActive = !$scope.btnIsActive;
        if (data.data.path !== null) {
          $scope.localImg = true;
          $scope.s3Img = false;
        }
        if ($scope.user.isAdmin) {
          $scope.files = data.data.files;
        } else {
          //List files by Id
          CityCamService.listFilesById(folder)
            .then(function (data) {
              $scope.files = data.data.files;
            }, function (err) {
              return err;
            })
        }
      }, function (err) {
        return err;
      });
  };

  $scope.deleteFile = function (file) {
    var idDb = file._id;
    var idLocS3 = file._id + '.' + file.ext;
    UiService.confirmDialog('Delete file', 'Are you sure you want to delete this file?', function (answer) {
      if (answer === true) {
        CityCamService.deleteFile(idLocS3, idDb)
          .then(function (data, status, headers) {
            var index = $scope.files.indexOf(file);
            $scope.files.splice(index, 1);
            $rootScope.alert = {
              show: true,
              context: {
                type: 'success',
                msg: 'File successfully deleted!'
              }
            };
          });
      }
    });
  };

  /**
   * Switch files display type
   */
  $scope.toggleView = function (type) {
    $scope.viewType = type;
  };


});