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
