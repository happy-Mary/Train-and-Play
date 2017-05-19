tpApp.controller("parentController", function($scope, $window, $cookies) {

$scope.userStatus = {};
$scope.checkUserStatus = function() {
	var cookie = $cookies.get("access_token");
	if(!cookie){
		$scope.userStatus.status = "publicUser";
	} else {
		$scope.userStatus.status = "commonUser";
	}
  return $scope.userStatus;
};

$scope.checkUserStatus();

$scope.logOut = function(){
	$cookies.remove("access_token");
	$scope.checkUserStatus();
}

$scope.logIn = function(token){
	$cookies.put("access_token", token);
	$scope.checkUserStatus();
}

});