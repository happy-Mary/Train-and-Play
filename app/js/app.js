
var tpApp = angular.module("tpApp", 
            ["ui.router", "ct.ui.router.extras", "ui.bootstrap", "ngCookies", "ngResource"]);

tpApp.run(function($state, $rootScope, $location) {
    // $state.transitionTo('app.main');
    $rootScope.$state = $state;
    $rootScope.$location = $location;

    $rootScope.changeTempl = function(stateName) {
        var stateName = stateName.toString();
        $state.go(stateName, {}, { location: false });
    };

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
                    controller: "ModalFormCtrl"
                },
            },

        })
        .state('modal.welcom', {
            url: '/welcom',
            templateUrl: "templates/partials/reg-enter.html",
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
        .state("app.train", {
            url: "/train/{num:[0-9]{1,8}}",
            templateUrl: "templates/pages/train1-startpage.html"
        })
        .state("app.trainings", {
            url: "/trainings",
            templateUrl: "templates/pages/trainings.html"
        })
        // on authorisation return objectFactory.getObject('/tnpapi/users/({id:user.id})') from main;
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

// GETTING DATA FROM SERVER
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


