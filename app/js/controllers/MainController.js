tpApp.controller("MainController", function($scope, $location, $http) {

    $scope.getLoc = function() {
        $scope.location = window.location;
        $scope.pathHash = $scope.location.hash.substr(1);
        if ($scope.pathHash === "/main") {
            return true;
            // console.log($scope.pathHash);
        } else {
            return false;
        }
    }

    $scope.openPage = function(view) {
        $location.path(view);
    }

    // content for first showing modalwindow
    $scope.authWindow = "../../templates/partials/reg-enter.html";

    // open modal window and give it first view
    $scope.showModalWindow = function(content) {
        $scope.modalOpen = true;
        // calling modalDirective.js 
        $scope.openModal(content);
    }

    $http.get('templates/pages/test.json').
    success(function(data, status, headers, config) {
        $scope.posts = data.records[0];
        // console.log($scope.posts);
    }).
    error(function(data, status, headers, config) {
        // log error
    });

});