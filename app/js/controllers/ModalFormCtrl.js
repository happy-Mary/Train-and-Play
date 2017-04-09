tpApp.controller("ModalFormCtrl", function($scope, $http) {

    // partial views for diffrent modal content



    // управление переключением табов
    $scope.item = "registr";

    // validation functions
    $scope.getError = function(error) {
        if (angular.isDefined(error)) {
            if (error.required) {
                return "Обязательно для заполнения";
            } else if (error.email) {
                return "Некорректный адрес электронной почты";
            } else if (error.pattern) {
                // write function validation for each feald and replace text: 
                // Некорректный адрес электронной почты
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
            return "Введенные пароли не совпадают";
        } else if (angular.isDefined(error) && error.required) {
            return "Обязательно для заполнения";
        }
    };


    // regexp for password and email 
    $scope.regexPass = '^[a-z0-9_-]+$';
    // $scope.regexPass = '((?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]).{5,20})';
    $scope.regexEmail = '[a-zA-Z0-9_.-]+\@[a-zA-Z0-9_]+\.[a-zA-Z]{2,6}$';
    $scope.formRegData = {};
    $scope.formEnterData = {};
    $scope.recoverPassData = {};
    $scope.PostDataResponse = "Server message";

    // registration data
    $scope.addNewUser = function() {
        $scope.postNewUser = {};
        for (var key in $scope.formRegData) {
            $scope.postNewUser[key] = $scope.formRegData[key];
        }
        delete $scope.postNewUser.confPass;

        $http.post('/tnp/users/registration/', angular.toJson($scope.postNewUser)).then(function(response) {
            $scope.PostDataResponse = response.data;
            console.log("Server had our data");
            if ($scope.PostDataResponse.urlForMail !== "") {
                $scope.openRegFinish();
            }

        }, function(response) {
            console.log("Server is not happy");
            $scope.PostDataResponse = response.status + " " + response.statusText;

            // $scope.PostDataResponse = {};
            // $scope.PostDataResponse.urlForMail = "https://www.google.by";
            // $scope.openRegFinish();
        });
    };


    //enter data
    $scope.enterUser = function() {
        // data for server
        // console.log($scope.formEnterData);

        $http.post('/tnp/users/login/', angular.toJson($scope.formEnterData)).then(function(response) {
            $scope.PostDataResponse = response.data;
            console.log("Server had our data");
        }, function(response) {
            console.log("Server is not happy");
            $scope.PostDataResponse = response.status + " " + response.statusText;
        });
    };

});

// TODO: write logic for register confirmation or error.message

$scope.recoverPass = function() {
    $http.post('/tnp/users/passrecovery/', angular.toJson($scope.recoverPassData)).then(function(response) {
        console.log("Server had our data");
        $scope.PostDataResponse = response.data;
        if ($scope.PostDataResponse.urlForMail !== "") {
            $scope.openPassRecoverFinish();
        }
    });
}