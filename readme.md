# NG-ROLE-AUTH
This is a role based authentication module for angular.js.  This modules is meant to provide two
bits of functionality: 
- Hide UI elements when based on user role and authentication. 
- Block routes from users that do not have the appropriate role. 

This module is *not* meant to provide the authentication mechanism or the resources for the 
roles.  Frankly, I don't want to provide that because it would just make the module more 
complicated and force you to use something that you probably don't want to use anyway.  

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
