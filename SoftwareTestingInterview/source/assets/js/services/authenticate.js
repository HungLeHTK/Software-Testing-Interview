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
