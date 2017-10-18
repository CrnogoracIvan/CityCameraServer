var app = angular.module('citycamera', [
    'ui.router',
    'ngAnimate',
    'ui.bootstrap',
    'ui.uploader',
    'angular-loading-bar',
    'chart.js'
  ])
  .config(function($stateProvider, $urlRouterProvider, $httpProvider) {

    $urlRouterProvider.otherwise(function($injector) {
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
      .state('upload', {
        url: '/upload',
        isPublic: true,
        parent: 'base',
        templateUrl: '/partials/upload.html',
        controller: 'UploadCtrl'
      })
      .state('showFile', {
        url: '/showFile',
        isPublic: true,
        parent: 'folder',
        templateUrl: '/partials/showDile.html',
        controller: 'FolderCtrl'
      })
      .state('dashboard', {
        url: '/dashboard',
        isPublic: false,
        parent: 'base',
        templateUrl: '/partials/dashboard.html'
      })
      .state('folder', {
        url: '/folders',
        parent: 'dashboard',
        templateUrl: '/partials/folder.html',
        controller: 'FolderCtrl'
      })
  });
