(function(){
	
	function Service($rootScope, $route, $location, $window, $q, NRA_MSG){
		
		var self = this;
		
		this.getRole = function () {
            var deferred = $q.defer();
            deferred.resolve(null);
            return deferred.promise;
        };
		
		this.isAuthorized = function (auth) {
            var deferred = $q.defer();
            if (typeof auth === "string") {
                auth = [auth];
            }

            self.getRole().then(function (roles) {
                if (typeof roles === "string") {
                    roles = [roles];
                }

                var isAllowed = true;
                if (auth[0]) {
                    isAllowed = false;
                    for (var i = 0; i < roles.length; i++) {
                        if (auth.indexOf(roles[i]) !== -1) {
                            isAllowed = true;
                            break;
                        }
                    }
                }
                deferred.resolve(isAllowed);
            });
            return deferred.promise;
        };
		
		this.onChange = function(event, next, prev){
			var auth = next.$$route && next.$$route.authorized ? next.$$route.authorized : [];
			
			self.isAuthorized(auth).then(function (isAllowed) {
                if (!isAllowed) {
                    $rootScope.$broadcast(NRA_MSG.accessDenied, (next.$$route ? next.$$route.originalPath : ""));
                    console.error("Access denied on unauthorized root:", (next.$$route ? next.$$route.originalPath : ""));
                    console.error("Reloading...");

                    if (prev && prev.$$route) {
                        $location.path(prev.$$route.originalPath).replace();
                    } else {
                        var url = "/";
                        if ($route.routes[null]) {
                            url = $route.routes[null].redirectTo;
                        }
                        $location.path(url).replace();
                    }

                }
            });
		};
	}
	
	angular.module("ngRoleAuth").service("AuthService", ["$rootScope", "$route", "$location", "$window", "$q", "NRA_MSG", Service]);
})();