app.service('CityCamService', function($http) {
  return {
    login: function(user) {

      return $http({
        method: 'POST',
        url: '/admin/login',
        data: user
      });
    },
    register: function(user) {
      return $http({
        method: 'POST',
        url: '/admin/register',
        data: user
      });
    },
    folder: function(user) {
      return $http({
        method: 'GET',
        url: '/file/folders',
        data: user
      });
    },
    upload: function(user) {
      return $http({
        method: 'POST',
        url: '/file/upload',
        data: user
      });
    },

    deleteFile: function(filename) {
      return $http({
        method: 'DELETE',
        url: '/file/delete',
        data: {
          file: filename
        }
      });
    },
    listFolder: function(folder) {
      return $http({
        method: 'GET',
        url: '/file/' + folder + '/files'
      });
    }
  };
});
