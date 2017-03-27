tpApp.controller("ModalFormCtrl", ['$scope', '$http', function($scope, $http) {
    // управление табами
    $scope.item = "registr";
    $scope.setTab = function() {
        if ($scope.item === "registr") {
            $scope.item = "enter"
        } else {
            $scope.item = "registr"
        }
        return $scope.item;
    }
    $scope.textMail = document.querySelector("input[type='email']");

    $scope.getError = function(error) {
        if (angular.isDefined(error)) {
            if (error.required) {
                return "Поле не должно быть пустым";
            } else if (error.email) {
                return "Некорректный адрес электронной почты";
            } else if (error.pattern) {
                return "Некорректное значение";
            } else if (error.minlength) {
                return "Слишком короткий пароль"
            } else if (error.maxlength) {
                return "Слишком длинный пароль"
            }
        }
    }

    $scope.comparePass = function(error) {
        if (angular.isDefined(error) && error.pattern) {
            return "Пароли не совпадают";
        } else if (angular.isDefined(error) && error.required) {
            return "Поле не должно быть пустым";
        }
    }


    // регулярка для пароля
    $scope.regexPass = '\\d+';

    $scope.formReg = {};

    // отправка формы
    $scope.saveData = function() {
        console.log($scope.formReg);
        delete $scope.formReg.confPass;
        console.log(angular.toJson($scope.formReg));
    }

}]);