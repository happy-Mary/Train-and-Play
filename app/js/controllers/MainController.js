tpApp.controller("MainController", function($rootScope, $scope, $location) {

    $rootScope.$on('$stateChangeSuccess', function(event, to, toParams, from, fromParams) {
        //save the previous state in a rootScope variable so that it's accessible from everywhere
        $rootScope.previousState = from;
    });

    // $scope.openPage = function(view) {
    //     $location.path(view);
    // }

    // TEST DATA
    $scope.user = { id: 334, name: 'Jone' };
     $scope.userPR = '^[0-9]{2,10}$'
});