tpApp.controller("ModalFormCtrl", function($scope, $http) {

    $scope.PostDataResponse = "Post test message";
    // управление табами
    $scope.item = "registr";
    $scope.setTab = function() {
        if ($scope.item === "registr") {
            $scope.item = "enter"
        } else {
            $scope.item = "registr"
        }
        return $scope.item;
    };

    // validation functions
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
    };

    $scope.comparePass = function(error) {
        if (angular.isDefined(error) && error.pattern) {
            return "Пароли не совпадают";
        } else if (angular.isDefined(error) && error.required) {
            return "Поле не должно быть пустым";
        }
    };


    // regexp for password and email 
    // TODO: change regexp for password
    $scope.regexPass = '\\d+';
    $scope.regexEmail = '[a-zA-Z0-9_.]+\@[a-zA-Z0-9_]+\.[a-zA-Z]{2,4}$';
    $scope.formReg = {};

    // отправка формы
    $scope.saveData = function() {
        // data for server
        $scope.postNewUser = {};
        for (var key in $scope.formReg) {
            $scope.postNewUser[key] = $scope.formReg[key];
        }
        delete $scope.postNewUser.confPass;

        console.log($scope.formReg);
        console.log(angular.toJson($scope.postNewUser));
        // post 
        $http.post('localhost:8080/tnp/users/registration/', $scope.postNewUser).success(function(data) {
            console.log("Server had our data");
            $scope.PostDataResponse = data;
        }).error(function(data) {
            console.log("Server is not happy");
            $scope.PostDataResponse = "ERROR";
        });


    };
});


// headers: { 'Content-Type': 'application/json' }