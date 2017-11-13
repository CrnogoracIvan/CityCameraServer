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
    deleteFile: function (filename) {
      return $http({
        method: 'DELETE',
        url: '/file/delete',
        data: {
          file: filename
        }
      });
    },
    listFiles: function (folder) {
      console.log('list files http', folder)
      return $http({
        method: 'GET',
        url: '/file/' + folder + '/files'
      });
    },
    listFilesById: function (folder) {
      console.log('listfilesBy ID http', folder)
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