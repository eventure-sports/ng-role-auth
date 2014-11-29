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