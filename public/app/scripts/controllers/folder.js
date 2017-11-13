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
      }
    }, function (err) {
      UiService.warningDialog('Error register');
    });

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
  /**
   * Invoke City Camera to list files from specific folder
   * @param folder - folder name
   */
  $scope.listFiles = function (folder) {

    $scope.selected = 0;

    $scope.select = function (index) {
      $scope.selected = index;
    };

    $scope.folder = folder;

    //List files by Id
    CityCamService.listFiles(folder)
      .then(function (data) {
        
        $scope.btnIsActive = !$scope.btnIsActive;

        if (!$scope.user.isAdmin) {
          CityCamService.listFilesById(folder)
            .then(function (data) {
              $scope.path = data.data.path;
              $scope.files = data.data.files;
              console.log('data list files', $scope.files)
            }, function (err) {
              return err;
            })
        }
        $scope.path = data.data.path;
        $scope.files = data.data.files;
      }, function (err) {
        return err;
      });

  };


  /**
   * Invoke City Camera delete file API
   * @param file
   */
  $scope.deleteFile = function (file) {
    console.log('path', file.content);
    var check = file.content
    var deleteFile;
    var x = "http";
    if (check.substring(0, x.length) !== x) {
      deleteFile = $scope.folder + '/' + file.filename
    } else {
      deleteFile = file.filename
    }
    UiService.confirmDialog('Delete file', 'Are you sure you want to delete this file?', function (answer) {
      if (answer === true) {
        CityCamService.deleteFile(deleteFile)
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