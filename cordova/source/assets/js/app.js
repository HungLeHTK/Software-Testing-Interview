/**
 * @name App
 * @description Define global variables and functions
 * @version 1.0
 */

var app = angular.module('app', ['ngRoute', 'ngResource', 'ngAnimate', 'ngCookies', 'angular-md5']);

app.constant('WS_URL', '');
app.value('version', '1.0');

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/', {
      controller: 'IntroController',
      templateUrl: 'partials/intro.html'
    })
    .when('/login', {
      controller: 'LoginController',
      templateUrl: 'partials/login.html'
    })
    .when('/home', {
      controller: 'HomeController',
      templateUrl: 'partials/home.html'
    })
    .otherwise({
      redirectTo: '/'
    });
}]);

app.run(['$rootScope', '$location', '$cookieStore', '$http', function ($rootScope, $location, $cookieStore, $http) {
  $rootScope.app = {};
  $rootScope.app.loginUser = $cookieStore.get('loginUser') || null;
  $rootScope.$on('$locationChangeStart', function (event, next, current) {
    // if($location.path() !== '/'){
    //   if(!$rootScope.app.loginUser){
    //     $location.path('/');
    //   }
    // }
    // else{
    //   if($rootScope.app.loginUser){
    //     $location.path('/home');
    //   }
    // }
  });
  // $ionicPlatform.ready(function() {
  //   // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
  //   // for form inputs)
  //   if(window.cordova && window.cordova.plugins.Keyboard) {
  //     cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
  //   }
  //   if(window.StatusBar) {
  //     StatusBar.styleDefault();
  //   }
  // });
}]);

angular.element(document).ready(function(){
  angular.bootstrap(document, ['app'], {
    strictDi: true
  });
});
