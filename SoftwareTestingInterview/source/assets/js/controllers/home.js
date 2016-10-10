app.controller('HomeController', ['$scope', 'authenticate', '$location', function($scope, authenticate, $location) {
  $scope.logout = function(){
    authenticate.logout().then(function(respone){
      $location.path('/');
    });
  };
}]);
