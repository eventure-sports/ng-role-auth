require.config({
    baseUrl: 'src',
    paths: {
		angular: "/vendor/angular/angular"
    },
	shim: {
	    "angular": {
	        exports: "angular"
	    },
	}
});

require(["./app"], function(app) {

});