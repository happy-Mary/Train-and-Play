tpApp.controller("AccountCtrl", function($scope, $http, $stateParams) {
    // GETTING OBJECT
    // http get function
    // maybe this codegoes to ui - route resolve before template loaded ? ? ? ? ?

    // $http({
    //     url: "/tnp/users/profile/" + $stateParams.id,
    //     method: "get",
    // }).then(function(response) {
    //     $scope.userData = response.data;
    //     console.log("Got user data " + $stateParams.id);
    // }, function(response) {
    //     console.log("Can't find " + $stateParams.id);
    //     $http.get('templates/pages/user.json').success(function(data) {
    //         console.log(data.name);
    //         $scope.userData = data;
    //     });
    // });
    // GETTING OBJECT//////////////////////////////////////////////////////////////////////////////

    // AWARDS
    $scope.swowHideLink = "Развернуть";
    $scope.awardBlockVisible = false;

    $scope.toggleContent = function() {
        $scope.awardBlockVisible = $scope.awardBlockVisible === false ? true : false;
        $scope.swowHideLink = $scope.swowHideLink === "Развернуть" ? "Свернуть" : "Развернуть";
        // console.log($scope.awardBlockVisible);
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