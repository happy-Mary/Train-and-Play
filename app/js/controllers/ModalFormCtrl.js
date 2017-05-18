tpApp.controller("ModalFormCtrl", function($scope, $rootScope, $http, $location, $resource, $httpParamSerializer, $cookies) {

    // switching tabs object
    $scope.item = { tab: 'enter' }

    // validation functions
    $scope.getErrorPass = function(error) {
        if (angular.isDefined(error)) {
            if (error.required) {
                return "Обязательно для заполнения";
            } else if (error.minlength) {
                return "Слишком короткий пароль"
            } else if (error.maxlength) {
                return "Слишком длинный пароль"
            } else if (error.pattern) {
                return "Используйте: A-Z,a-z,(~!@#%&_-)"
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
        var weakPass = new RegExp("^([a-z]{6,20}|\d{6,20}|[A-Z]{6,20}|[~!@#%&_-]{6,20})$");
        var strongPass = new RegExp("(?=.*[0-9])(?=.*[~!@#%&_-])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z~!@#%&_-]{6,20}");

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
    // $scope.formEnterData = {};
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
            console.log(response.data);
            if ($scope.PostRegisterResponse.urlForMail !== "") {
                // clean registration fields and  server message = "";
                $scope.formRegData = {};
                $scope.PostRegisterResponse.message = "";
                // opening reg-finish window and redirect to mail link
                $scope.changeTempl('modal.regfinish');
            }
        }, function(response) {
            console.log("Server is not happy");
            console.log($scope.PostRegisterResponse = response.status + " " + response.statusText);
        });
    };

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // log in data
    console.log("Login start");
    $scope.formEnterData = {
        grant_type:"password"
        // username: "",
        // password: ""
    };

    $scope.enterUser = function() {
        $scope.encoded = btoa("myclient:myclientsecret");
        console.log($scope.formEnterData);

        var req = {
            method: 'POST',
            url: "/tnpapi/oauth/token",
            headers: {
                "Authorization": "Basic " + $scope.encoded,
                // "Content-type": "application/x-www-form-urlencoded; charset=utf-8"
                "Content-type": "application/x-www-form-urlencoded"
            },
            // data: $httpParamSerializer($scope.formEnterData)
            data:  "username=" + encodeURIComponent($scope.formEnterData.username) +
                     "&password=" + encodeURIComponent($scope.formEnterData.password) +
                     "&grant_type=password"
        }

        $http(req).then(function(data){
            $http.defaults.headers.common.Authorization = 
              'Bearer ' + data.data.access_token;
            $cookies.put("access_token", data.data.access_token);
            console.log($cookies.getAll());
            $scope.changeTempl('modal.regfinish');
            // window.location.href="/";
        }, function(response) {
            console.log("Server is not happy");
            console.log($scope.PostEnterResponse = response.status + " " + response.statusText);
            // $cookies.put("access_not_token", "data.data.access_token not ALLOWED");
            // console.log($cookies.get("access_not_token"));
            if(response.status == 401){ // If you have set 401
                    console.log("oh not again!");
                }
            console.log($cookies.getAll());
        });   


        // $http.post('/tnpapi/oauth/token', angular.toJson($scope.formEnterData)).then(function(response) {
        //     $scope.PostEnterResponse = response.data;
        //     console.log("Login data sent");
        //     console.log(response.data);
        // }, function(response) {
        //     console.log("Server is not happy");
        //     console.log($scope.PostEnterResponse = response.status + " " + response.statusText);
        // });


    };

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // recover sending an email
    $scope.recoverPassSendMail = function() {
        $http.post('/tnpapi/users/passwordrecovery', angular.toJson($scope.recoverPassData))
            .then(function(response) {
                console.log("Email for instructions was sent");
                $scope.PostRecoverResponse = response.data;
                console.log($scope.PostRecoverResponse);
                if ($scope.PostRecoverResponse.urlForMail !== "") {
                    $scope.changeTempl('modal.recoversend');
                }
            }, function(response) {
                console.log("Server is not happy");
                console.log($scope.PostRecoverResponse = response.status + " " + response.statusText);
            });
    };

    // change address link
    /* Post /tnpapi/users/newpass/{username}/
    запрос на ввод нового пароля (передается объект в котором 2 поля password и passwordAgain,
    назад тоже возвращаю string "Пароль успешно восстановлен" или "Пользователя с таким именем не существует",
    {username} - это имя пользователя до @)
    */

    // sending new password
    $scope.recoverNewPass = function() {
        console.log($scope.recoverNewPassData);
        $scope.postNewPass = {};
        for (var key in $scope.recoverNewPassData) {
            $scope.postNewPass[key] = $scope.recoverNewPassData[key];
        }
        delete $scope.postNewPass.confPass;

        $http.post('/tnp/users/newpass/', angular.toJson($scope.postNewPass.confPass)).then(function(response) {
            $scope.PostNewPassResponse = response.data;
            $scope.changeTempl('modal.recoverfinish');
        }, function(response) {
            console.log("Server is not happy");
            console.log($scope.PostNewPassResponse = response.status + " " + response.statusText);
            $scope.changeTempl('modal.recoverfinish');
        });
    };
});