// var tpApp = angular.module("tpApp", ["ngRoute", "ui.bootstrap"]);
var tpApp = angular.module("tpApp", ["ui.router", "ui.bootstrap"]);
// "vcRecaptcha"
// https://www.npmjs.com/package/ng-google-recaptcha

// UI-ROUTE
tpApp.config(['$stateProvider', '$urlMatcherFactoryProvider', '$urlRouterProvider', function($stateProvider, $urlMatcherFactoryProvider, $urlRouterProvider) {
    $urlMatcherFactoryProvider.caseInsensitive(true);
    $urlRouterProvider.otherwise("/main");
    $stateProvider
        .state("main", {
            url: "/main",
            templateUrl: "templates/pages/main.html"
        })
        .state("landing", {
            url: "/landing",
            templateUrl: "templates/pages/landing.html"
        })
        .state("trainings", {
            url: "/trainings",
            templateUrl: "templates/pages/trainings.html"
        })
        .state("userDetails", {
            url: "/user/:id",
            templateUrl: "templates/pages/user.html",
            controller: "AccountCtrl",
            controllerAs: "MainController"
                // ??? resolve: here we get hhtp user-data
        })
}]);


// NG_ROUTE (Angular default)
// tpApp.config(['$routeProvider', function($routeProvider) {
//     $routeProvider.caseInsensitiveMatch = true;
//     $routeProvider
//         .when("/main", { templateUrl: "templates/pages/main.html" })
//         .when("/landing", { templateUrl: "templates/pages/landing.html" })
//         .when("/user", { templateUrl: "templates/pages/user.html" })
//         .otherwise({
//             redirectTo: '/main'
//         });
// }]);

// progressbar controller
tpApp.controller('ProgressDemoCtrl', function($scope) {
    $scope.max = 100;
    $scope.value = $scope.traning.progress;
    // console.log($scope.value);
});