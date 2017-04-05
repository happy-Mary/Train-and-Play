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

    $scope.regEnterContent = "../../templates/partials/reg-enter.html";
    $scope.showModalAuth = function() {
        console.log("OPENING WINDOW");
        $scope.modalOpen = true;
        $scope.modalPath = $scope.regEnterContent;

    }

});