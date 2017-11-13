app.service('SessionService', function ($rootScope, $window, $injector) {
  var service = {
    storeSession: function (data) {

      if (data.token) {
        $rootScope.token = data.token;
      }

      if (data.user) {
        $rootScope.user = data.user;
        $rootScope.userId = data.user._id;
      }

      $window.localStorage.token = $rootScope.token;
      $window.localStorage.userId = $rootScope.userId;
      $window.localStorage.user = JSON.stringify($rootScope.user);

    },
    destroySession: function () {

      var state = $injector.get('$state');
      delete $rootScope.token;
      delete $rootScope.userId;
      delete $rootScope.user;

      delete $window.localStorage.token;
      delete $window.localStorage.userId;
      delete $window.localStorage.user;
      // Manual inject
      if (state.current.name !== 'login') {
        state.go('login');
      }

    },
    updateSession: function (user) {
      //copy all properties from user
      // angular.forEach(user, function (val, key) {
      //   $rootScope.user[key] = val;
      // });
      var currentUser = $rootScope.user.currentUser;
      $rootScope.user = user;
      $rootScope.user.currentUser = currentUser;
    },
    updateUserSession: function (user) {
      $window.localStorage.user = JSON.stringify(user);
    },
    restoreSession: function () {
      if ($window.localStorage.token) {
        $rootScope.token = $window.localStorage.token;
        $rootScope.userId = $window.localStorage.userId;
        $rootScope.user = JSON.parse($window.localStorage.user);
        return true;
      } else {
        return false;
      }
    },
    isAuthenticated: function () {

      if (!$rootScope.userId) {
        return this.restoreSession();
      } else {
        return true;
      }
    }
  };

  return service;
});