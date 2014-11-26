(function(){
	
	var mod = angular.module("ngRoleAuth", []);
	
	function run($rootScope){
		
		$rootScope.$on("$routeChangeStart", function(event, next){
			console.log(arguments);
		});
		
	}
	
	mod.run(["$rootScope", run]);
	
})();