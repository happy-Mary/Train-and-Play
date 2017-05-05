tpApp.controller("ModalFormCtrl", function($scope, $http) {
    // partial views for diffrent modal content

    // управление переключением табов
    $scope.item = "registr";

    // validation functions
    $scope.getErrorPass = function(error) {
        if (angular.isDefined(error)) {
            if (error.required) {
                return "Обязательно для заполнения";
            } else if (error.pattern) {
                return "Используйте: A-Z,a-z,(~!@#%^&*_-)"
            } else if (error.minlength) {
                return "Слишком короткий пароль"
            } else if (error.maxlength) {
                return "Слишком длинный пароль"
            }
        }
    };

    $scope.getErrorEmail = function(error) {
        if (angular.isDefined(error)) {
            if (error.required) {
                return "Обязательно для заполнения";
            } else if (error.email || error.pattern) {
                return "Некорректный адрес электронной почты";
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
        var weakPass = new RegExp("^([a-z]{6,20}|\d{6,20}|[A-Z]{6,20}|[~!@#%^&*_-]{6,20})$");
        var strongPass = new RegExp("(?=.*[0-9])(?=.*[~!@#%^&*_-])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z~!@#%^&*_-]{6,20}");

        if (strongPass.test(value)) {
            $scope.passStrColor["color"] = "green";
            return "СИЛЬНЫЙ ПАРОЛЬ";
        } else if (weakPass.test(value)) {
            $scope.passStrColor["color"] = "orange";
            return "НЕНАДЕЖНЫЙ ПАРОЛЬ";
        } else {
            $scope.passStrColor["color"] = "lightblue";
            return "СРЕДНИЙ ПАРОЛЬ";
        }
    }

    // regexp for password and email 
    $scope.regexPass = '^[0-9a-zA-Z~!@#%^&*_-]{6,20}$'
    $scope.regexEmail = '^[a-zA-Z0-9_.-]+\@[a-zA-Z0-9_]+[.]{1}[a-zA-Z]{2,6}$';
    // forms data for sending
    $scope.formRegData = {};
    $scope.formEnterData = {};
    $scope.recoverPassData = {};
    // $scope.PostRecoverResponse = "Server message";

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
            // checking server response
            // console.log(response.data);
            if ($scope.PostRegisterResponse.urlForMail !== "") {
                // clean registration fields and  server message = "";
                $scope.formRegData = {};
                $scope.PostRegisterResponse.message = "";
                // opening reg-finish window and redirect to mail link
                $scope.openRegFinish();
            }
        }, function(response) {
            console.log("Server is not happy");
            console.log($scope.PostRegisterResponse = response.status + " " + response.statusText);
        });
    };

    //log in data
    $scope.enterUser = function() {
        console.log($scope.formEnterData);

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

    // recover sending an email
    $scope.recoverPassSendMail = function() {
        console.log($scope.recoverPassData);

        $http.post('/tnpapi/users/passwordrecovery', angular.toJson($scope.recoverPassData)).then(function(response) {
            console.log("Email for instructions was sent");
            $scope.PostRecoverResponse = response.data;
            console.log($scope.PostRecoverResponse);
            if ($scope.PostRecoverResponse.urlForMail !== "") {
                $scope.openPassRecoverSend();
            }
        }, function(response) {
            console.log("Server is not happy");
            console.log($scope.PostRecoverResponse = response.status + " " + response.statusText);
        });
    };

    // sending new password
    $scope.recoverNewPass = function() {
        console.log($scope.recoverNewPassData);
        $scope.postNewPass = {};
        for (var key in $scope.recoverNewPassData) {
            $scope.postNewPass[key] = $scope.recoverNewPassData[key];
        }
        delete $scope.postNewPass.confPass;
        // change address link
        /* Post /tnpapi/users/newpass/{username}/
        запрос на ввод нового пароля (передается объект в котором 2 поля password и passwordAgain,
        назад тоже возвращаю string "Пароль успешно восстановлен" или "Пользователя с таким именем не существует",
        {username} - это имя пользователя до @)
        */
        // ??? {username} клиент получает с переходом по ссылке с почты?
        $http.post('/tnp/users/newpass/', angular.toJson($scope.postNewPass.confPass)).then(function(response) {
            $scope.PostNewPassResponse = response.data;
            // если успешно, а как мы это поймем?
            // или это не надо понимать, просто отправлять пароль...?
            // как сервер понимает кому менять парольпосле перехода по ссылке с почты?
            $scope.openRecoverFinish();
        }, function(response) {
            console.log("Server is not happy");
            console.log($scope.PostNewPassResponse = response.status + " " + response.statusText);
        });
    };


});