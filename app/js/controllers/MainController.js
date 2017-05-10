tpApp.controller("MainController", function($scope, $rootScope, trainList, $location) {

    $rootScope.$on('$stateChangeSuccess', function(event, to, toParams, from, fromParams) {
        //save the previous state in a rootScope variable so that it's accessible from everywhere
        $rootScope.previousState = from;
    });
    // getting trains object in ui-router
    $scope.trainings = trainList.data;


    // random numbers
    function getRandNumArray(n, arr, min, max) {
        // make random number
        function RandomDiap(N, M) {
            return Math.floor(Math.random() * (M - N + 1)) + N;
        }
        // cleaning arr
        function clean(arr) {
            for (var i = 0; i < arr.length; i++)
                for (var j = i + 1; j < arr.length; j++)
                    if (arr[i] == arr[j])
                        arr.splice(j, 1);
            return arr;
        }
        // result array
        function checkArray(n, arr, min, max) {
            if (arr.length < n) {
                // makeArray(n, arr, min, max);
                getRandNumArray(n, arr, min, max);
            } else {
                return arr;
            }
        }
        // main code
        var num = n;
        var mass = arr;
        for (var i = mass.length; mass.length < num; i++) {
            mass.push(RandomDiap(min, max));
        }
        clean(mass);
        checkArray(num, mass, min, max);
    }
    // getting random amount of objects from all
    function getRandObjects(arr) {
        for (var i = 0; i < indexArr.length; i++) {
            var k = indexArr[i];
            arr.push($scope.trainings[k]);
        }
        return arr;
    }
    // getting 3 random trainings for landing page
    var indexArr = [];
    getRandNumArray(3, indexArr, 0, $scope.trainings.length - 1);
    $scope.randTrainings = [];
    getRandObjects($scope.randTrainings);

    // TEST DATA
    $scope.user = { id: 334, name: 'Jone' };

});