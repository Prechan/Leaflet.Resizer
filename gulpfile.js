var gulp = require('gulp');

// Include plugins
var plugins = require('gulp-load-plugins')(); 

// Path var
var source = './src'; 
var destination = './dist';

// SASS
gulp.task('css', function(){
    return gulp.src(source + '/leaflet.resizer.css')
        .pipe(plugins.csscomb())
        .pipe(plugins.cssbeautify({indent: '  '}))
        .pipe(plugins.autoprefixer())
        .pipe(gulp.dest(destination));
});

// Minify
gulp.task('minify', function(){
   return gulp.src(destination + '/leaflet.resizer.css')
       .pipe(plugins.csso())
       .pipe(plugins.rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(destination));
});

// JS
gulp.task('js', function(){
    return gulp.src(source + '/*.js')
        .pipe(plugins.uglify())
        .pipe(plugins.rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(destination));
});

// Complete tasks
gulp.task('prod', ['css', 'minify', 'js']);