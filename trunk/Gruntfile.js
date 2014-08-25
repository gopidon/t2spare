/**
 * Created by gopi on 8/25/14.
 */
module.exports = function(grunt) {
    // Project Configuration

    grunt.loadNpmTasks('grunt-loopback-sdk-angular');
    grunt.loadNpmTasks('grunt-docular');

    grunt.initConfig({
        jshint: {
            src: ['gruntfile.js', 'client/www/js/**/*.js', 'common/models/*.js', 'server/**/*.js'],
            options: {

            }
        },
        watch: {
            js: {
                files: '<%= jshint.src %>',
                tasks: ['jshint']
            },
            html: {
                files: ['client/www/**'],
                options: {
                    livereload: true
                }
            },
            css: {
                files: ['client/www/css/**'],
                options: {
                    livereload: true
                }
            }
        },
        nodemon: {
            dev: {
                script: 'server/server.js',
                options: {
                    ignore: ['README.md', 'node_modules/**', '.DS_Store'],
                    ext: 'js',
                    env: {
                        "NODE_ENV": "development"
                    },
                    watch: ['common', 'server'],
                    delay: 300,
                    env: {
                        PORT: 3000
                    },
                    cwd: __dirname,
                    callback: function (nodemon) {
                        nodemon.on('log', function (event) {
                            console.log(event.colour);
                        });

                        /** Open the application in a new browser window and is optional **/
                        nodemon.on('config:update', function () {
                            // Delay before server listens on port
                            setTimeout(function() {
                                require('open')('http://localhost:63342/strongloop/t2spare/trunk/client/www/index.html');
                            }, 1000);
                        });

                        /** Update .rebooted to fire Live-Reload **/
                        nodemon.on('restart', function () {
                            // Delay before server listens on port
                            setTimeout(function() {
                                require('fs').writeFileSync('.rebooted', 'rebooted');
                            }, 1000);
                        });
                    }
                }
            }
        },
        concurrent: {
            tasks: ['nodemon','watch'],
            options: {
                logConcurrentOutput: true
            }
        },
        open : {
            dev: {
                path: 'http://localhost:63342/strongloop/t2spare/trunk/client/www/index.html#/tab/dash',
                app: 'Google Chrome'
            }
        },
        loopback_sdk_angular: {
            services: {
                options: {
                    input: './server/server.js',
                    output: './client/www/js/lb-services.js'
                }
            }
        },
        docular: {
            groups: [
                {
                    groupTitle: 'LoopBack',
                    groupId: 'loopback',
                    sections: [
                        {
                            id: 'lbServices',
                            title: 'LoopBack Services',
                            scripts: [ './client/www/js/lb-services.js' ]
                        }
                    ]
                }
            ]
        }
    });



    // Load JSHint task
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-concurrent');
    //grunt.loadNpmTasks('grunt-open');



    //Making grunt default to force in order not to break the project.
    grunt.option('force', true);

    // Default task.
    grunt.registerTask('default', ['jshint','docular','concurrent']);

};