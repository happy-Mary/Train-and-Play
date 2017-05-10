// var tpApp = angular.module("tpApp", ["ngRoute", "ui.bootstrap"]);
var tpApp = angular.module("tpApp", ["ui.router", "ct.ui.router.extras", "ui.bootstrap"]);
// "vcRecaptcha"
// https://www.npmjs.com/package/ng-google-recaptcha

tpApp.run(function($state, $rootScope, $location) {
    // $state.transitionTo('app.main');
    $rootScope.$state = $state;
    $rootScope.$location = $location;

    $rootScope.changeTempl = function(stateName) {
        var stateName = stateName.toString();
        $state.go(stateName, {}, { location: false });
    };
});
// "modal.regfinish"


// UI-ROUTE
tpApp.config(function($stateProvider, $stickyStateProvider, $urlMatcherFactoryProvider, $urlRouterProvider, $locationProvider) {
    $urlMatcherFactoryProvider.caseInsensitive(true);

    $urlRouterProvider.otherwise("/");

    $stateProvider
        .state('app', {
            url: '',
            views: {
                'app': { templateUrl: "templates/pages/app.html" }
            },
            sticky: true,
            deepStateRedirect: { default: { state: 'app.main' } },
            dsr: true
        })
        .state("modal", {
            url: "/modal",
            views: {
                "modal": {
                    templateUrl: 'templates/pages/modal.html',
                    controller: "ModalFormCtrl",
                    controllerAs: "ModalFormCtrl"
                },
                // 'app': { templateUrl: "templates/pages/app.html" }
            },

        })
        .state('modal.welcom', {
            url: '/welcom',
            templateUrl: "templates/partials/reg-enter.html"
        })
        .state('modal.newpass', {
            // which regExp should I use here
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
        .state("app.user", {
            // url: "/user/:id",
            url: "/user/{id:[0-9a-fA-F]{1,8}}",
            templateUrl: "templates/pages/user.html",
            controller: "AccountCtrl",
            controllerAs: "MainController"
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