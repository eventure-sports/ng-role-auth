(function(){
	
	function Service($rootScope, NRA_MSG){
		
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
				$rootScope.$broadcast(NRA_MSG.accessDenied, (next.$$route ? next.$$route.originalPath : ""));
				console.log("Access denied on unauthorized root:", (next.$$route ? next.$$route.originalPath : ""));
				event.preventDefault();
			}
		};
	}
	
	angular.module("ngRoleAuth").service("AuthService", ["$rootScope", "NRA_MSG", Service]);
})();