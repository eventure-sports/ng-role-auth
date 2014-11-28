(function(){
	
	var mod = angular.module("ngRoleAuth", []);
	
	function run($rootScope, auth){
		
		$rootScope.$on("$routeChangeStart", auth.onChange);
		
	}
	
	mod.run(["$rootScope", "AuthService", run]);
	
})();