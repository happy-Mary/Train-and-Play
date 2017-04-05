tpApp.directive("modalWindow", function() {
    return {
        restrict: 'E',
        scope: false,
        templateUrl: 'templates/pages/modal.html',
        controller: function($scope) {
            $scope.modalOpen = false;
            // $scope.modalOpen = true;
            $scope.closeModal = function() {
                $scope.modalOpen = false;
                $scope.modalPath = undefined;
            }
        }
    }
});