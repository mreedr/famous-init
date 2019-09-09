// Include gulp
var gulp = require('gulp');
var server = require('gulp-express');

// Include Our Plugins
var less = require('gulp-less');
var uglify = require('gulp-uglify');
var watch = require('gulp-watch');

gulp.task('build:images', function() {
    return gulp.src('app/public/images/*')
        .pipe(gulp.dest('build/images'));
});

gulp.task('build:less', function() {
    return gulp.src('app/public/less/*.less')
        .pipe(less())
        .pipe(gulp.dest('build/css'));
});

gulp.task('uglify:js', function() {
    return gulp.src('app/public/src/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('build/src'));
});

gulp.task('watch:server', function() {
    gulp.watch([
        'app/routes/*.js',
        'app/views/*.ejs',
        'app/app.js'
    ], ['start']);
});

gulp.task('watch:images', function() {
    gulp.watch('app/public/images/*', ['build:images']);
});

gulp.task('watch:less', function() {
    gulp.watch('app/public/less/*.less', ['build:less']);
});

gulp.task('watch:src', function() {
    gulp.watch('app/public/src/*.js', ['build:src']);
});

gulp.task('start', function() {
    server.run({
        file: 'bin/www'
    });
});

gulp.task('build:src', ['uglify:js']);

gulp.task('build:public', ['build:images', 'build:less', 'build:src']);
gulp.task('watch:public', ['watch:images', 'watch:less', 'watch:src']);

gulp.task('server', ['build:public', 'watch:server', 'watch:public', 'start']);
