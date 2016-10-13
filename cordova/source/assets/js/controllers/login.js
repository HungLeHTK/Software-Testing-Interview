app.controller('LoginController', ['$scope', 'authenticate', '$location', 'md5', function($scope, authenticate, $location, md5) {
  $scope.login = function() {
    authenticate.login($scope.username, md5.createHash($scope.password))
      .then(function(respone) {
        $location.path('/home');
      });
  };
}]);
