var app = angular.module('citycamera', [
    'ui.router',
    'ngAnimate',
    'ui.bootstrap',
    'ui.uploader',
    'angular-loading-bar',
    'chart.js'
  ])
  .config(function ($stateProvider, $urlRouterProvider, $httpProvider) {

    $urlRouterProvider.otherwise(function ($injector) {
      var $state = $injector.get('$state');

      $state.go('login');
    });

    $httpProvider.interceptors.push('sessionInterceptor');

    $stateProvider
      .state('base', {
        abstract: true,
        url: '',
        templateUrl: '/partials/base.html'
      })
      .state('login', {
        url: '/login',
        isPublic: true,
        parent: 'base',
        templateUrl: '/partials/login.html',
        controller: 'LoginCtrl'
      })
      .state('register', {
        url: '/register',
        isPublic: true,
        parent: 'base',
        templateUrl: '/partials/register.html',
        controller: 'RegisterCtrl'
      })
      .state('list', {
        url: '/list',
        isPublic: false,
        parent: 'dashboard',
        templateUrl: '/partials/list.html',
        controller: 'UserCtrl'
      })
      .state('dashboard', {
        url: '/dashboard',
        isPublic: false,
        parent: 'base',
        templateUrl: '/partials/dashboard.html',
        controller: 'LoginCtrl'

      })
      .state('folder', {
        url: '/folders',
        isPublic: false,
        parent: 'dashboard',
        templateUrl: '/partials/folder.html',
        controller: 'FolderCtrl'
      })
      .state('folderByUser', {
        url: '/folders/:id',
        isPublic: false,
        parent: 'dashboard',
        templateUrl: '/partials/folder.html',
        controller: 'FolderCtrl'
      })
      .state('FilesByUser', {
        url: '/folders/:id/:folder',
        isPublic: false,
        parent: 'dashboard',
        templateUrl: '/partials/folder.html',
        controller: 'FolderCtrl'
      })
  });