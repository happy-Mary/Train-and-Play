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
                // write function validation for each field and replace text: 
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
    $scope.PostRegisterResponse = "Server message";

    // registration data
    $scope.addNewUser = function() {
        $scope.postNewUser = {};
        for (var key in $scope.formRegData) {
            $scope.postNewUser[key] = $scope.formRegData[key];
        }
        delete $scope.postNewUser.confPass;

        $http.post('/tnpapi/users', angular.toJson($scope.postNewUser)).then(function(response) {
            $scope.PostRegisterResponse = response.data;
            console.log("Server had our data");
            if ($scope.PostRegisterResponse.urlForMail !== "") {
                $scope.openRegFinish();
            }

        }, function(response) {
            console.log("Server is not happy");
            console.log($scope.PostRegisterResponse = response.status + " " + response.statusText);

            // $scope.PostDataResponse = {};
            // $scope.PostDataResponse.urlForMail = "https://www.google.by";
            // $scope.openRegFinish();
        });
    };


    //enter data
    $scope.enterUser = function() {
        console.log($scope.formEnterData);
        console.log(myFields.myRecaptchaResponse);

        $http.post('/tnp/users/login/', angular.toJson($scope.formEnterData)).then(function(response) {
            $scope.PostEnterResponse = response.data;
            console.log("Server had our data");
        }, function(response) {
            console.log("Server is not happy");
            console.log($scope.PostEnterResponse = response.status + " " + response.statusText);
        });
    };

    $scope.recoverPass = function() {
        $http.post('/tnp/users/passrecovery/', angular.toJson($scope.recoverPassData)).then(function(response) {
            console.log("Server had our data");
            $scope.PostDataResponse = response.data;
            if ($scope.PostDataResponse.urlForMail !== "") {
                $scope.openPassRecoverFinish();
            }
        });
    };


});