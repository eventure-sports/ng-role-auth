(function(){
	
	var mod = angular.module("ngRoleAuth", []);
	
	mod.constant("NRA_MSG", {accessDenied : "nra.access_denied"})
	
	function run($rootScope, auth){
		
		$rootScope.$on("$routeChangeStart", auth.onChange);
		
	}
	
	mod.run(["$rootScope", "AuthService", run]);
	
})();