var gulp = require('gulp');
var sass = require('gulp-sass');
var gulpLoad = require('gulp-load-plugins');
var browserSync = require('browser-sync').create();

var $ = gulpLoad();
 
gulp.task('sass', function () {
  return gulp.src('./res/css/style.scss')
    .pipe(sass({
    	outputStyle: 'expanded',
    }).on('error', sass.logError))
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('scripts', ()=>{
	gulp.src('')
		.pipe($.webpack(require('./webpack.config.js')))
		.pipe(gulp.dest('./dist/web'));
})

gulp.task('server', function() {
  browserSync.init({
    server: {
        baseDir: './'
    },
    port: 8000
  })
})


/*
var gulp        = require('gulp'),
    tinypng     = require('gulp-tinypng');

var dir = 'src', dist = 'dist';

gulp.task('tinypng', function () {
    gulp.src( dir+'/*.{png,jpg,jpeg}')
        .pipe(tinypng('yUeOYaKKT26xUl0AmGo1FJ_1WUe3659I'))
        .pipe(gulp.dest( dist+'/images' ));
});
*/