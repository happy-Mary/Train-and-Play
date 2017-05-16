// TESTING DATA
tpApp.factory('objectFactory', function($http) {
    var factoryResult = {
        getObject: function(url) {
            var urlString = String(url);
            var promise = $http({
                method: 'GET',
                url: urlString
            }).success(function(data, status, headers, config) {
                return data;
            });

            return promise;
        }
    };
    // console.log(factoryResult.getObject());
    return factoryResult;
});