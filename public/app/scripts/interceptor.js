app.factory('sessionInterceptor', function($rootScope, SessionService, $q) {
  var sessionInterceptor = {
    request: function(config) {
      config.headers.authorization = ($rootScope.token) ? $rootScope.token : '';
      if (config.url == '/file/upload') {
        config.headers['Content-Type'] = 'multipart/form-data';
      } else {
        config.headers['Content-Type'] = 'application/json';
      }

      return config;
    },
    response: function(response) {
      return response;
    },
    responseError: function(rejection) {
      try {
        // Error handler
        if (rejection.data && rejection.data.error) {
          $rootScope.alert = {
            show: true,
            context: {type: 'danger', msg: rejection.data.error.message}
          };
        }
        return $q.reject(rejection);
      } catch (e) {
        $rootScope.alert = {show: true, context: {type: 'danger', msg: 'FATAL ERROR'}};

        return $q.reject(rejection);
      }
    }
  };

  return sessionInterceptor;
});
