app.controller('FolderCtrl', function ($scope, CityCamService, $rootScope, $state, SessionService, UiService) {
  //set inital folder path
  $scope.folder = '/';

  //set default view type
  $scope.viewType = 'list';

  CityCamService.folder($scope.user)
    .then(function (result, status, headers) {
      $scope.folders = result.data.folders;
      console.log('list of folders angular', $scope.folders)
    }, function (err) {
      UiService.warningDialog('Error register');
    });

  $scope.upload = function (folder) {
    CityCamService.upload($scope.user)
      .then(function (data, status, headers) {
        //          SessionService.storeSession(data.data.data);
      });
  };

  /**
   * Invoke City Camera to list files from specific folder
   * @param folder - folder name
   */
  $scope.listFolder = function (folder) {
    $scope.folder = folder;
    CityCamService.listFolder(folder)
      .then(function (data) {
        $scope.path = data.data.path;
        $scope.files = data.data.files;
        console.log('$scope.files');
        console.log($scope.files);
        console.log('$scope.path');
        console.log($scope.path);
      });

  };

  /**
   * Invoke City Camera delete file API
   * @param file
   */
  $scope.deleteFile = function (file) {
    console.log("angular-delete>>", file.filename);
    UiService.confirmDialog('Delete file', 'Are you sure you want to delete this file?', function (answer) {
      console.log("answer", answer);
      if (answer === true) {
        CityCamService.deleteFile($scope.folder + '/' + file.filename)
          .then(function (data, status, headers) {
            console.log('This is files>>: ', $scope.files);
            console.log('This is folder>>: ', $scope.folder);
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