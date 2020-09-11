requirejs.config({
    paths: {
        backbone: '../node_modules/backbone/backbone-min',
        underscore: '../node_modules/underscore/underscore-min',
        tpl: '../node_modules/amd-loader-tpl/tpl',
        jquery: '../node_modules/jquery/dist/jquery.min',
        react: '../node_modules/react/cjs/react.development',
        reactdom: '../node_modules/react-dom/cjs/react-dom.development'
    },
    shim: {
        jquery: {
            exports: '$',
        },
        underscore: {
            exports: '_',
        },
        backbone: {
            exports: 'Backbone',
            deps: ['jquery', 'underscore'],
        },
        react: {
            exports: 'React',
        },
        reactdom: {
            exports: 'ReactDOM',
            deps: ['react']
        },
    }
});

requirejs(['main'])