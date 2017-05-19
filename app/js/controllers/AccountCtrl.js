tpApp.controller("AccountCtrl", function($scope, userList, $http, $stateParams, $window) {

    $scope.userData = userList.data; //changes are made here

     console.log($scope.userData.id);

    $window.localStorage.setItem("currentUser", $scope.userData.name);

    // AWARDS
    $scope.swowHideLink = "Развернуть";
    $scope.awardBlockVisible = false;

    $scope.toggleContent = function() {
        $scope.awardBlockVisible = $scope.awardBlockVisible === false ? true : false;
        $scope.swowHideLink = $scope.swowHideLink === "Развернуть" ? "Свернуть" : "Развернуть";
    };
    // сортируем тренинги по завершенности
    $scope.userData.trainings.sort(function(obj1, obj2) {
        return obj2.progress - obj1.progress;
    });

    $scope.complitedArr = $scope.userData.trainings.filter(function(obj) {
        return obj.progress === 100;
    });

    $scope.inprogressArr = $scope.userData.trainings.filter(function(obj) {
        return obj.progress < 100;
    });

    // для свернуть показать по ng-repeat limitTo: countLimit 
    // $scope.countLimit = 3;
    $scope.countLimit = $scope.inprogressArr.length;

});