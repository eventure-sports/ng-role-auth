(function(){
	
	var dtCheck = 5000;
	
	function Directive($interval, authService){
		
		function link(scope, element, attrs){
			
			var insertionElement = element.parent();
			var removed = false;
		
			function compile(){
		
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
		
			$interval(compile, dtCheck);
		}
		
		var dir = {
			restrict: "A", 
			scope: {
				authorized: "=nraAuth",
			},
			link: link
		};
		
		return dir;
	}
	
	angular.module("ngRoleAuth").directive("nraAuth", ["$interval", "AuthService", Directive]);
})();