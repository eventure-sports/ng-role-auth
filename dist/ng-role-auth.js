(function(){
	
	var mod = angular.module("ngRoleAuth", []);
	
	mod.constant("NRA_MSG", {accessDenied : "nra.access_denied"})
	
	function run($rootScope, auth){
		
		$rootScope.$on("$routeChangeStart", auth.onChange);
		
	}
	
	mod.run(["$rootScope", "AuthService", run]);
	
})();
(function(){
	
	var dtCheck = 5000;
	
	function Directive($interval, authService){
		
		function link(scope, element, attrs){
			
			var insertionElement = element.parent();
			var removed = false;
		
			function compile(){
				console.log("auth:", scope.authorized);
				
				authService.isAuthorized(scope.authorized, function(err, isAllowed){
					if(!isAllowed){
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
				});
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
(function(){
	
	function Service($rootScope, NRA_MSG){
		
		var self = this;
		
		this.getRole = function(callback){
			callback(null, null);
		};
		
		this.isAuthorized = function(auth, callback){
			if(typeof auth === "string"){
				auth = [auth];
			}
			
			self.getRole(function(err, roles){
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
			
				callback(null, isAllowed);
			});
		};
		
		this.onChange = function(event, next){
			var auth = next.$$route && next.$$route.authorized ? next.$$route.authorized : [];
			
			self.isAuthorized(auth, function(err, isAllowed){
				if(!isAllowed){
					$rootScope.$broadcast(NRA_MSG.accessDenied, (next.$$route ? next.$$route.originalPath : ""));
					console.log("Access denied on unauthorized root:", (next.$$route ? next.$$route.originalPath : ""));
					event.preventDefault();
				}
			});
			
		};
	}
	
	angular.module("ngRoleAuth").service("AuthService", ["$rootScope", "NRA_MSG", Service]);
})();