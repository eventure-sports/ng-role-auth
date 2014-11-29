# Angular Role Based Authentication
This is a role based authentication module for angular.js.  This modules is meant to provide two
bits of functionality: 
- Hide UI elements when based on user role and authentication. 
- Block routes from users that do not have the appropriate role. 

This module is *not* meant to provide the authentication mechanism or the resource for learning about the 
roles.  Frankly, I don't want to provide that because it would just make the module more 
complicated and force you to use something that you probably don't want to use anyway.  

## Usage
### Setup
This utilizes the angular router (`ngRoute`), so simply add this module and that module as dependencies. 
```
var app = angular.module("MyAwesomeApp", ["ngRoute", "ngRoleAuth"]);
```

Then overload the `AuthService` `getRole` method.  This method should return the role or roles of the current
user of the system.  You can overload it anywhere, but the `run` method seems like a good place.  Note that you 
can return a single string or an array of strings for the current role.  Also note that if you want to do some async stuff
before you can cache the role, it will update the UI with the new role.  
```
app.run(["AuthService", function(authService){
	
	auth.getRole = function(){
		return "admin";  // this could also return an array
	};

}]);
```

### Routes
Routes are very easy to assign roles to.  Just set the `authorized` parameter. 
```
app.config(["$routeProvider", function($routeProvider){
	$routeProvider
		.when("/admin-route", {
			templateUrl: "partials/admin-route.html",
			authorized: "admin"
		})
		.when("/user-admin-route", {
			templateUrl: "partials/user-admin-route.html",
			authorized: ["user", "admin"]
		})
		.when("/admin-route", {
			templateUrl: "partials/admin-route.html",
			authorized: ["admin"]
		})
		.otherwise("/");
}]);
```

### Elements
Elements are also easy to assign roles to.  You simply need to use the `nra-auth` directive.  
```
<a href="#/admin-route" nra-auth="'admin'">Only shows for Admin</a>
<a href="#/user-admin-route" nra-auth="['admin', 'user']">Shows for both Admin and User</a>
```

## Development
Development should be fairly straightforward. The first time you start do the following:  

1. Grunt, node, and bower are used for linting, building, and minifying.  Make sure they are installed on your system.  
2. Install the necessary grunt modules using npm:  
  ```
  $ npm install
  ```  
3. Load the dependencies with bower.  
  ```
  $ bower install
  ```   
4. Kick off grunt.  Grunt is used to lint, build, minify, and start a development server on port 9000.  
  ```
  $ grunt
  ```  
5. Now that the development server is running. you can access it at [localhost:9000](http://localhost:9000). 

The repo is structure in a fairly standard way.  
- `./dist` is where the built files live.  They are checked in so that we can make useful releases easily. 
- `./src` is where the source files live. 
- `./example` is where the example application lives.  Check it out on the development server by 
browsing to [localhost:9000/example](http://localhost:9000/example). 

## License
[BSD 2-Clause](http://opensource.org/licenses/BSD-2-Clause) -- Do whachya wanna! 
