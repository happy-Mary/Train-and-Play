
var tpApp = angular.module("tpApp", 
            ["ui.router", "ct.ui.router.extras", "ui.bootstrap", 'ngStorage']);

tpApp.run(function($state, $rootScope, $location, $localStorage) {
    // $state.transitionTo('app.main');
    $rootScope.$state = $state;
    $rootScope.$location = $location;

    $rootScope.changeTempl = function(stateName) {
        var stateName = stateName.toString();
        $state.go(stateName, {}, { location: false });
    };

    // Оставляем пользователя авторизованным если страница перезагрузится 
        if ($localStorage.currentUser) {
            $http.defaults.headers.common.Authorization = 'Bearer ' + $localStorage.currentUser.token;
        }
     // Выкидываем пользователя на страницу авторизации если он не авторизован 
    $rootScope.$on('$locationChangeStart', function (event, next, current) {
            var publicPages = ['/modal'];
            var restrictedPage = publicPages.indexOf($location.path()) === -1;
            if (restrictedPage && !$localStorage.currentUser) {
                $location.path('/modal');
            }
        });
    //////////////////////////////////////////////////////////////////////////////////////////////////
});

// UI-ROUTER
tpApp.config(function($stateProvider, $stickyStateProvider, 
                      $urlMatcherFactoryProvider, $urlRouterProvider, $locationProvider) {
    $urlMatcherFactoryProvider.caseInsensitive(true);
    $urlRouterProvider.otherwise("/");
    $stateProvider
        .state('app', {
            url: '',
            views: {
                'app': {
                    templateUrl: "templates/pages/app.html",
                    controller: "MainController",
                    resolve: {
                        trainList: function(objectFactory) {
                            return objectFactory.getObject('templates/pages/trainings.json');
                        }
                    }
                }
            },
            sticky: true,
            deepStateRedirect: { default: { state: 'app.main' } },
            dsr: true,

        })
        .state("modal", {
            url: "/modal",
            views: {
                "modal": {
                    templateUrl: 'templates/pages/modal.html',
                    controller: "ModalFormCtrl",
                    controllerAs: "vm"
                },
            },

        })
        .state('modal.welcom', {
            url: '/welcom',
            templateUrl: "templates/partials/reg-enter.html"
        })
        .state('modal.newpass', {
            url: '/newpass/{id:[0-9a-fA-F]{1,8}}',
            templateUrl: "templates/partials/pass-recovery-newpass.html"
        })
        .state('app.main', {
            url: '/main',
            templateUrl: "templates/pages/main.html"
        })
        .state('app.landing', {
            url: '/landing',
            templateUrl: "templates/pages/landing.html"
        })
        .state("app.trainings", {
            url: "/trainings",
            templateUrl: "templates/pages/trainings.html"
        })
        // return objectFactory.getObject('/tnpapi/users/({id:user.id})');
        .state("app.user", {
            // url: "/user/:id",
            url: "/user/{id:[0-9a-fA-F]{1,8}}",
            templateUrl: "templates/pages/user.html",
            controller: "AccountCtrl",
            resolve: {
                userList: function(objectFactory) {
                    return objectFactory.getObject('templates/pages/user-data.json');
                }
            }
        })
        // states for modal without changing url
        .state({
            name: 'modal.regfinish',
            url: '/regfinish',
            controller: function() {},
            templateUrl: '/templates/partials/reg-finish.html'
        })
        .state({
            name: 'modal.passrecover',
            url: '/regfinish',
            controller: function() {},
            templateUrl: '/templates/partials/pass-recovery.html'
        })
        .state({
            name: 'modal.recoversend',
            url: '/recoversend',
            controller: function() {},
            templateUrl: '/templates/partials/pass-recovery-send.html'
        })
        .state({
            name: 'modal.recoverfinish',
            url: '/recoverfinish',
            controller: function() {},
            templateUrl: '/templates/partials/pass-recovery-finish.html'
        });

    $stickyStateProvider.enableDebug(true);
    // $locationProvider.html5Mode(true);
});


// progressbar controller
tpApp.controller('ProgressDemoCtrl', function($scope) {
    $scope.max = 100;
    $scope.value = $scope.traning.progress;
    // console.log($scope.value);
});

// TESTING DATA
tpApp.factory('objectFactory', function($http) {
    var factoryResult = {
        getObject: function(url) {
            var urlString = String(url);
            var promise = $http({
                method: 'GET',
                url: urlString
            }).success(function(data, status, headers, config) {
                return data;
            });

            return promise;
        }
    };
    // console.log(factoryResult.getObject());
    return factoryResult;
});

// "vcRecaptcha"
// https://www.npmjs.com/package/ng-google-recaptcha

tpApp.factory('AuthenticationService', Service);

function Service($http, $localStorage) {
    var service = {};
    service.Login = Login;
    service.Logout = Logout;
    return service;

        function Login(username, password, callback) {
            $http.post('/tnpapi/oauth/token',  { username: username, password: password })
                .success(function (response) {
                    // Авторизация пройдет если в запросе мы получим авторизационный токен
                    if (response.token) {
                        // Сохраняем данные пользователя в локальное хранилище браузера и оставляем его таким если он перезагрузится или сменится страница
                        $localStorage.currentUser = { username: username, token: response.token };

                        // Добавляем jwt token в авторизационный заголовок для всех запросов
                        $http.defaults.headers.common.Authorization = 'Bearer ' + response.token;
 
                        // отправляем кэлбек при удачной авторизации для подтверждения авторизации
                        callback(true);
                    } else {
                        // не отправляем кэлбек если авторизация не удалась 
                        callback(false);
                    }
                });
            }
        }
        function Logout() {
            // Удаляем пользователя из локального хранилища
            delete $localStorage.currentUser;
            $http.defaults.headers.common.Authorization = '';
        }
    }
};