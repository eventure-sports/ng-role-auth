module.exports = function(grunt) {
	grunt.initConfig({
		concat: {
			options: {
				stripBanners: true,
			},
			module: {
				files: {
					"dist/ng-role-auth.js": ["src/*/*.js", "src/*.js"],
				}
			}
		},
		jshint: {
			options: {
				multistr: true,
				eqnull: true,
				force: true,
			},
			source: []
		},
		uglify: {
			my_target: {
				files: {
					'dist/ng-role-auth.min.js': ["dist/ng-role-auth.js"],
				}
			}
		},
		connect: {
			server: {
				options: {
					port: 9000,
					base: "./",
					open: {
						target: "http://localhost:9001/test/",
						appName: "open"
					}
				}
			}
	    },
		watch: {
			grunt: {
				files: ["Gruntfile.js"],
				tasks: ["jshint", "concat", "uglify"]
			},
			srcFiles: {
				files: ['src/*.js', 'src/*/*.js', 'src/*/*/*.js'],
				tasks: ["jshint", "concat", "uglify"]
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks("grunt-contrib-concat");
	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks("grunt-contrib-connect");
	grunt.loadNpmTasks("grunt-contrib-watch");

	grunt.registerTask("build", ["jshint", "concat", "uglify"]);
	grunt.registerTask("default", ["jshint", "concat", "uglify", "connect", "watch"]);
};