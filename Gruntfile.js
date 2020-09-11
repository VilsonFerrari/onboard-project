module.exports = function(grunt) {
    grunt.initConfig({
        'http-server': {
            'dev': {
                port: 9000,
                host: "127.0.0.1",
                ext: "html"
            }
        }
        // uglify: {
        //     options: {
        //         mangle: false,
        //     },
        //     build: {
        //         files: {
        //             'build/core.min.js': ['core/**/*.js'],
        //         }
        //     }
        // }
    });

    grunt.loadNpmTasks('grunt-http-server');
    // grunt.loadNpmTasks('grunt-contrib-uglify');
}