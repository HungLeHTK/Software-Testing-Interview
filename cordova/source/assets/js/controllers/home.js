app.controller('HomeController', ['$log', '$scope', 'authenticate', '$location', '$ionicPopup', function($log, $scope, authenticate, $location, $ionicPopup) {
  $ionicPopup.alert({
      title: 'Welcome homepage'
  });
}]);
