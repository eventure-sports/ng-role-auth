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
	
	app.controller("User", ["$route", '$q', "AuthService", function($route, $q, auth){
		var self = this;
		this.role = "user";
		
		this.update = function(){
			console.log("Role updated to:", self.role);
		};
		
		auth.getRole = function(){
			var deferred = $q.defer();
            deferred.resolve(self.role);
            return deferred.promise;	
		};
	}]);
		
})();
	
	
	