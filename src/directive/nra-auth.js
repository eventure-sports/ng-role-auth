(function(){
	
	function Directive(authService){
		
		function link(scope, element, attrs){
			// console.log(scope, element, attrs);
			
			console.log("auth:", scope.authorized);
			
			if(!authService.isAuthorized(scope.authorized)){
				element.remove();
			}
		}
		
		var dir = {
			restrict: "A", 
			// transclude: true,
			scope: {
				authorized: "=nraAuth"
			},
			link: link
		};
		
		return dir;
	}
	
	angular.module("ngRoleAuth").directive("nraAuth", ["AuthService", Directive]);
})();