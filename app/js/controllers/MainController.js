tpApp.controller("MainController", function($scope, $location) {

    $scope.getLoc = function() {
        $scope.location = window.location;
        $scope.pathHash = $scope.location.hash.substr(1);
        console.log($scope.pathHash);
        if ($scope.pathHash === "/main") {
            return true;
        } else {
            return false;
        }
    }

    // content for first showing modalwindow
   $scope.authWindow = "../../templates/partials/reg-enter.html";

    // open modal window and give it first view
    $scope.showModalWindow = function(content) {
        $scope.modalOpen = true;
        // calling modalDirective.js 
        $scope.openModal(content);
    }
});