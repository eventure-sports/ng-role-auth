(function(){
	
	function Service(){
		
		var self = this;
		
		this.getRole = function(){
			return null;
		};
		
		this.onChange = function(event, next){
			var auth = next.$$route && next.$$route.authorized ? next.$$route.authorized : [];
			if(typeof auth === "string"){
				auth = [auth];
			}
			
			var role = self.getRole();
			
			if(auth.length > 0 && auth.indexOf(role) == -1){
				console.log("Access denied on unauthorized root:", next.$$route.originalPath);
				event.preventDefault();
			}
		};
	}
	
	angular.module("ngRoleAuth").service("AuthService", [Service]);
})();