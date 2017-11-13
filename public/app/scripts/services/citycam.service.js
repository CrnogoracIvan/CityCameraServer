app.service('CityCamService', function ($http, $rootScope) {
  return {
    login: function (user) {
      return $http({
        method: 'POST',
        url: '/user/login',
        data: user
      });
    },
    register: function (user) {
      return $http({
        method: 'POST',
        url: '/user/register',
        data: user
      });
    },
    listUsers: function () {
      return $http({
        method: 'GET',
        url: '/user/list'
      });
    },
    folder: function (user) {
      return $http({
        method: 'GET',
        url: '/file/folders',
        data: user
      });
    },
    folderByUserId: function () {
      return $http({
        method: 'GET',
        url: '/file/folders/' + $rootScope.userId
      });
    },
    deleteFile: function (filename,id) {
      return $http({
        method: 'DELETE',
        url: '/file/delete/'+ id,
        data: {
          file: filename
        }
      });
    },
    listFiles: function (folder) {
      return $http({
        method: 'GET',
        url: '/file/' + folder + '/files'
      });
    },
    listFilesById: function (folder) {
      return $http({
        method: 'GET',
        url: '/file/' + $rootScope.userId +'/'+ folder +'/files'
      });
    },
    update: function (user) {
      return $http({
        method: 'PUT',
        url: '/user/' + user._id,
        data: user
      });
    }
  };
});