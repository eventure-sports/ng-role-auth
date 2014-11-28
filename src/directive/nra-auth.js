(function(){
	
	function Directive($interval, authService){
		
		function link(scope, element, attrs){
			
			var insertionElement = element.parent();
			var removed = false;
		
			function compile(){
				console.log("auth:", scope.authorized);
		
				if(!authService.isAuthorized(scope.authorized)){
					if(!removed){
						element.remove();
						removed = true;
					}
				}else{
					if(removed){
						insertionElement.append(element);
						removed = false;
					}
				}
			}
		
			compile();
		
			$interval(compile, 3000);
		}
		
		var dir = {
			restrict: "A", 
			// transclude: true,
			scope: {
				authorized: "=nraAuth",
			},
			link: link
		};
		
		return dir;
	}
	
	angular.module("ngRoleAuth").directive("nraAuth", ["$interval", "AuthService", Directive]);
})();