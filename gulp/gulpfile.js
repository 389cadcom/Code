
//postcss autoprefixer
gulp.task('autoprefixer', function () {
    var postcss      = require('gulp-postcss');
    var sourcemaps   = require('gulp-sourcemaps');
    var autoprefixer = require('autoprefixer');

    return gulp.src('./src/*.css')
        .pipe(sourcemaps.init())
        .pipe(postcss([ autoprefixer(['iOS >= 8', 'Android >= 4.1']) ]))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./dest'));
});