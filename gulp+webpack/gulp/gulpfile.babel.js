import gulp from 'gulp';
import gulpLoad from 'gulp-load-plugins';

let $ = gulpLoad();

const styles = {
	src: './res/css/bootstrap.scss',
	dist: './dist/assert/css'
};

//TODO Task
gulp.task('clean', ()=>{
	return gulp.src('./dist/')
	.pipe($.clean())
})

gulp.task('sass', ()=>{
	return gulp.src(styles.src)
		.pipe($.sourcemaps.init())
		.pipe($.sass({
            outputStyle: 'compact'
        }).on('error', $.sass.logError))
		.pipe($.sourcemaps.write())
		.pipe(gulp.dest(styles.dist));
});


const scripts = {
	src: './res/js/jquery.js',
	dist: './dist/assert/js',
	bootstrap: './res/js/bootstrap/*.js'
};

/**
 * 默认按文件名排序
 */
import list from './config.js';

gulp.task('concat', ()=>{
	//console.log(list)

	return gulp.src(list)
		.pipe($.concat('bootstrap.js'))
		/*.pipe($.uglify({
			mangle: false,
			compress: false,
			preserveComments: 'function' 
		}))*/
		.pipe(gulp.dest(scripts.dist))
		.pipe($.notify({message: 'bootstrap js concat!'}));
})

/**
 * 指定变量名不混淆改变
 * mangle: {except: ['require' ,'exports' ,'module' ,'$']}
 * mangle: true,					//类型：Boolean 默认：true 是否修改变量名
 * compress: true,					//类型：Boolean 默认：true 是否完全压缩
 * preserveComments: 'all' 			//保留所有注释    all, license, function
 */
gulp.task('js', ()=>{
	return gulp.src(scripts.src)
		.pipe($.uglify({
			mangle: false
		}))
		.pipe(gulp.dest(scripts.dist));
})


gulp.task('default', ['clean'], ()=>{
	gulp.start( 'sass', 'concat', 'js')
});


//侦听Sass变化
gulp.task('watch', ()=>{
	gulp.watch('src/sass/**/*.scss', ['sass']);

	gulp.watch('src/js/**/*.js', ['js']);

	
});


/*
 * {relative: true}  相对路径
 * 
 * {starttag: '<!-- inject:head:{{ext}} -->'}
 * 
 * event-stream      事件流
 */
gulp.task('index', ()=>{
	var jquery = gulp.src(['./dist/assert/**/jquery.js'], {read: false});
	var sources = gulp.src(['./dist/**/*.js','!./dist/assert/**/jquery.js', './dist/assert/**/*.css'], {read: false});
	
	return gulp.src('./src/index.html')
		.pipe($.inject(jquery,  {name: 'jquery', relative: true}))
		.pipe($.inject(sources, {relative: true}))
		.pipe(gulp.dest('./dist/'))
})

/**
 * gulp-webpack
 */
import config from './webpack.config.js';

gulp.task('web', ()=>{
	gulp.src('')
		.pipe($.webpack(config))
		.pipe(gulp.dest('./dist/web'));
});
