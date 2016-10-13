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
    if($location.path() !== '/'){
      if(!$rootScope.app.loginUser){
        $location.path('/');
      }
    }
    else{
      if($rootScope.app.loginUser){
        $location.path('/home');
      }
    }
  });
}]);

angular.element(document).ready(function(){
  angular.bootstrap(document, ['app'], {
    strictDi: true
  });
});

app.factory('api', ['$http', '$q', '$resource', function($http, $q, $resource) {
  return {
    rest: function(url, params, actions, options){
      return $resource(url, params, actions, options);
    },
    call: function(url, type, params){
      var deferred = $q.defer();
      $http({
        url: url || '',
        method: type || 'get',
        data: params || {}
      })
      .success(function(data){
        deferred.resolve(data);
      })
      .error(function(data){
        deferred.reject('error');
      });
      return deferred.promise;
    }
  };
}]);

app.factory('authenticate', ['$rootScope', 'api', '$cookieStore', 'WS_URL', function($rootScope, api, $cookieStore, WS_URL) {
  var auth = {};
  auth.login = function(username, password){
    return api.call(WS_URL + '/login', 'POST', {username: username, password: password}).then(function(respone){
      if(respone){
        auth.user = respone;
        $rootScope.app.loginUser = auth.user;
        $cookieStore.put('loginUser', $rootScope.app.loginUser);
      }else{
        console.log('Login failed.');
      }
    });
  };
  auth.logout = function(){
    return api.call(WS_URL + '/logout', 'GET').then(function(respone){
      if(respone.success){
        $rootScope.app.loginUser = null;
        $cookieStore.put('loginUser', null);
      }else{
        console.log('Logout failed.');
      }
    });
  };
  return auth;
}]);

app.controller('HomeController', ['$scope', 'authenticate', '$location', function($scope, authenticate, $location) {
  $scope.logout = function(){
    authenticate.logout().then(function(respone){
      $location.path('/');
    });
  };
}]);

app.controller('introController', ['$scope', 'authenticate', '$location', 'md5', function($scope, authenticate, $location, md5) {
  $scope.login = function() {
    authenticate.login($scope.username, md5.createHash($scope.password))
      .then(function(respone) {
        $location.path('/home');
      });
  };
}]);

app.controller('LoginController', ['$scope', 'authenticate', '$location', 'md5', function($scope, authenticate, $location, md5) {
  $scope.login = function() {
    authenticate.login($scope.username, md5.createHash($scope.password))
      .then(function(respone) {
        $location.path('/home');
      });
  };
}]);

