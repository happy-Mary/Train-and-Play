// var tpApp = angular.module("tpApp", ["ngRoute", "ui.bootstrap"]);
var tpApp = angular.module("tpApp", ["ui.router", "ct.ui.router.extras", "ui.bootstrap"]);
// "vcRecaptcha"
// https://www.npmjs.com/package/ng-google-recaptcha

tpApp.run(function($state, $rootScope, $location) {
    $state.transitionTo('app.main');
    $rootScope.$state = $state;
    $rootScope.$location = $location;
});


// UI-ROUTE
tpApp.config(function($stateProvider, $stickyStateProvider, $urlMatcherFactoryProvider, $urlRouterProvider, $locationProvider) {
    $urlMatcherFactoryProvider.caseInsensitive(true);

    $urlRouterProvider.otherwise("/main");

    $stateProvider
        .state("modal", {
            url: "/modal",
            views: {
                "modal": {
                    template: "<modal-window></modal-window>",
                    controller: "ModalFormCtrl",
                    controllerAs: "ModalFormCtrl"
                }
            }
        })
        .state('modal.welcom', {
            url: '/substate',
            templateUrl: "templates/partials/reg-enter.html"
        })
        .state('app', {
            url: '',
            views: {
                'app': {
                    templateUrl: "templates/pages/app.html"
                }

            },
            sticky: true,
            dsr: true
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
        .state("app.user", {
            url: "/user/:id",
            templateUrl: "templates/pages/user.html",
            controller: "AccountCtrl",
            controllerAs: "MainController"
        });

    $stickyStateProvider.enableDebug(true);

    // $urlRouterProvider.otherwise("/main");


    // $locationProvider.html5Mode(true);
});


// progressbar controller
tpApp.controller('ProgressDemoCtrl', function($scope) {
    $scope.max = 100;
    $scope.value = $scope.traning.progress;
    // console.log($scope.value);
});