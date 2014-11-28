(function(){
	
	var app = angular.module("app", ["ngRoute", "ngRoleAuth"]);
	
	app.config(["$routeProvider", function($routeProvider){
		$routeProvider
			.when("/butts", {
				templateUrl: "partials/butts.html",
				authorized: "admin"
			})
			.when("/heads", {
				templateUrl: "partials/heads.html",
				authorized: ["user", "admin"]
			})
			.otherwise("/");
	}]);
	
	app.run(["AuthService", function(auth){
		auth.getRole = function(){
			return "user";
		};
	}]);
	
})();
	
	
	