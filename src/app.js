(function(){
	
	var style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = '.nra-hide { display: none !important; }';
	document.getElementsByTagName('head')[0].appendChild(style);

	// document.getElementById('someElementId').className = 'cssClass';
	
	var mod = angular.module("ngRoleAuth", []);
	
	mod.constant("NRA_MSG", {accessDenied : "nra.access_denied"})
	
	function run($rootScope, auth){
		
		$rootScope.$on("$routeChangeStart", auth.onChange);
		
	}
	
	mod.run(["$rootScope", "AuthService", run]);
	
})();