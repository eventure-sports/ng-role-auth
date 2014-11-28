(function(){
	
	var mod = angular.module("ngRoleAuth", []);
	
	function run($rootScope, auth){
		
		$rootScope.$on("$routeChangeStart", auth.onChange);
		
	}
	
	mod.run(["$rootScope", "AuthService", run]);
	
})();
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
(function(){
	
	function Service(){
		
		var self = this;
		
		this.getRole = function(){
			return null;
		};
		
		this.isAuthorized = function(auth){
			if(typeof auth === "string"){
				auth = [auth];
			}
			
			var roles = self.getRole();
			if(typeof roles === "string"){
				roles = [roles];
			}
			
			var isAllowed = true;
			if(auth[0]){
				isAllowed = false;
				for(var i = 0; i < roles.length; i++){
					if(auth.indexOf(roles[i]) !== -1){
						isAllowed = true;
						break;
					}
				}
			}
			
			return isAllowed;
		};
		
		this.onChange = function(event, next){
			var auth = next.$$route && next.$$route.authorized ? next.$$route.authorized : [];
			
			if(!self.isAuthorized(auth)){
				console.log("Access denied on unauthorized root:", (next.$$route ? next.$$route.originalPath : ""));
				event.preventDefault();
			}
		};
	}
	
	angular.module("ngRoleAuth").service("AuthService", [Service]);
})();