let mix = require('laravel-mix');
var path = require('path');
/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */
 mix.webpackConfig({
   resolve: {
       alias: {
           '@': path.resolve('resources/assets/js/components/')
       },
   },
});

mix.styles('resources/assets/css/bootstrap.min.css', 'public/css/public.css');

mix.js('resources/assets/js/app.js', 'public/js/app.js');

mix.copyDirectory([
    'resources/assets/fonts/'
],'public/fonts/', false);

mix.copyDirectory('resources/assets/img', 'public/img');

mix.version();
