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

    // color for strength password message
    $scope.passStrColor = {
        "color": "blue"
    };
    // method for strength password message
    $scope.passStrength = function(value) {
        var weakPass = new RegExp("^([a-z]{6,20}|\d{6,20}|[A-Z]{6,20}|[!@#$%^&*_-]{6,20})$");
        var strongPass = new RegExp("(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*_-]{6,20}");

        if (strongPass.test(value)) {
            $scope.passStrColor["color"] = "green";
            return "STRONG PASSWORD";
        } else if (weakPass.test(value)) {
            $scope.passStrColor["color"] = "orange";
            return "WEAK PASS";
        } else {
            $scope.passStrColor["color"] = "lightblue";
            return "NORMAL PASSWORD";
        }
    }

    // regexp for password and email 
    $scope.regexPass = '^[0-9a-zA-Z@#$%_-]+$'
    $scope.regexEmail = '^[a-zA-Z0-9_.-]+\@[a-zA-Z0-9_]+\.[a-zA-Z]{2,6}$';
    // forms data for sending
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
            console.log("Registration data sent");
            if ($scope.PostRegisterResponse.urlForMail !== "") {
                $scope.openRegFinish();
            }
        }, function(response) {
            console.log("Server is not happy");
            console.log($scope.PostRegisterResponse = response.status + " " + response.statusText);

            // test
            // $scope.PostDataResponse = {};
            // $scope.PostDataResponse.urlForMail = "https://www.google.by";
            // $scope.openRegFinish();
        });
    };

    //log in data
    $scope.enterUser = function() {
        console.log("CLICK");
        console.log($scope.formEnterData);
        // console.log($scope.formEnterData.myRecaptchaResponse);

        // change address link
        $http.post('/tnp/users/login/', angular.toJson($scope.formEnterData)).then(function(response) {
            $scope.PostEnterResponse = response.data;
            console.log("Login data sent");
            // ?получаем id пользователя и переводим его туда????
            $scope.openPage("/user");
            $scope.closeModal();
        }, function(response) {
            console.log("Server is not happy");
            console.log($scope.PostEnterResponse = response.status + " " + response.statusText);
        });
    };

    $scope.recoverPass = function() {
        // change address link
        $http.post('/tnp/users/passrecovery/', angular.toJson($scope.recoverPassData)).then(function(response) {
            console.log("Email for instruction was sent");
            $scope.PostDataResponse = response.data;
            if ($scope.PostDataResponse.urlForMail !== "") {
                $scope.openPassRecoverFinish();
            }
        });
    };


});