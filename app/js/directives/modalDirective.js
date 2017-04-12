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

            $scope.openPassRecoverSend = function() {
                    $scope.modalPath = "../../templates/partials/pass-recovery-send.html";
                }
                // сюда идем по ссылке с почты
                // но мы перейдем через route, пока что
            $scope.openNewPassRecover = function() {
                $scope.modalPath = "../../templates/partials/pass-recovery-newpass.html";
            }

            $scope.openRecoverFinish = function() {
                $scope.modalPath = "../../templates/partials/pass-recovery-finish.html";
            }

        }
    }
});