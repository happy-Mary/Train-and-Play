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
            }

            $scope.openModal = function(contentModal) {
                $scope.modalPath = contentModal;
            }

            $scope.openRegFinish = function() {
                $scope.modalPath = "../../templates/partials/reg-finish.html";
            }

            $scope.openPassRecover = function() {
                $scope.modalPath = "../../templates/partials/pass-recovery.html";
            }

            // ссылка должна идти с почты

            // $scope.openPassRecoverFinish = function() {
            //     $scope.modalPath = "../../templates/partials/pass-recovery-finish.html";
            // }
        }
    }
});