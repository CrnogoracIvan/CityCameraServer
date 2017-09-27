app.run(function($injector, $rootScope, SessionService, UiService, CityCamService, $state) {
  SessionService.restoreSession();
  // Load UI config
  UiService.init();

  $rootScope.$on('$stateChangeStart', function(event, next) {
    var lastState = $rootScope.lastState;

    //prevent access to login page when authenticated
    if (next.name === 'login' && SessionService.isAuthenticated()) {
      if ($rootScope.lastState) {
        event.preventDefault();
        lastState = $rootScope.lastState;
        delete $rootScope.lastState;
        // Force user desired state pre-login
        return $state.go(lastState);
      }

      event.preventDefault();
      return $state.go('dashboard');
    }
    if (next.isPublic === false) {
      if (SessionService.isAuthenticated()) { //authenticated user is transferred to last state
        if ($rootScope.lastState) {
          event.preventDefault();
          lastState = $rootScope.lastState;
          delete $rootScope.lastState;
          return $state.go(lastState);
        }
      } else { //non authenticated user is transferred to login
        event.preventDefault();
        $rootScope.lastState = next.name;
        return $state.go('login');
      }
    }
  });
});
