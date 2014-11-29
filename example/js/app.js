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
			.when("/tails", {
				templateUrl: "partials/tails.html",
				authorized: ["admin"]
			})
			.otherwise("/");
	}]);
	
	app.controller("User", ["AuthService", function(auth){
		var self = this;
		this.role = "admin";
		
		this.update = function(){
			console.log("Role updated to:", self.role);
		};
		
		auth.getRole = function(){
			return self.role;
		};
	}]);
		
})();
	
	
	