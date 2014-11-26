(function(){
	
	var app = angular.module("app", ["ngRoute", "ngRoleAuth"]);
	
	app.config(["$routeProvider", function($routeProvider){
		$routeProvider
			.when("/butts", {
				templateUrl: "partials/butts.html",
			})
			.when("/heads", {
				templateUrl: "partials/heads.html",
			})
			.otherwise("/butts");
	}])
	
})();
	
	
	