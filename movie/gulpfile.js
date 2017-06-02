var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

var PATH = {
    src: './',
    css: './src/assets/styles/*.css',
    sass: './src/assets/sass/*.scss',
    js: '',
    dist: './dist/'
}

gulp.task('css', function() {
    return gulp.src(PATH.css)
        .pipe($.sourcemaps.init())
        .pipe($.cssnano())
        .pipe($.sourcemaps.write('.'))
        .pipe(gulp.dest('./static/styles'));
});

//expand compact compressed
gulp.task('sass', function() {
    return gulp.src(PATH.sass)
        .pipe($.sass({ outputStyle: 'compressed' }))
        .pipe(gulp.dest(PATH.dist))
        .pipe($.notify({ message: 'sass task complete!!' }));
});