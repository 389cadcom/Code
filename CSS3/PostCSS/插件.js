/*
2019-5-8
"postcss": "postcss src/index.css -o dist/test.css",
"css": "postcss -w ./src/css/*.css -d ./dist/css",
"js": "uglifyjs ./dist/js/*.js -m -c  -o ./dist/js/main.js",
"ES6": "babel ./src/js -d ./dist/js -w"
*/

//变量、条件、循环、嵌套、继承、混合、导入

precss		 //满足SASS开发者的习惯，继承了很多插件, 但存在很多坑(解释Css4出错--postcss-cssnext替代)
	"postcss": "^7.0.6",
	"postcss-advanced-variables": "^3.0.0",				//变量
	"postcss-atroot": "^0.1.3",
	"postcss-extend": "^2.0.0",										//继承,postcss-extend-rule不会抽取共用
	"postcss-nested": "^4.1.0",										//嵌套
	"postcss-property-lookup": "^2.0.0"						//循环
	"postcss-cssnext":														//CSS4语法, 包含有autoprefixer   {browsers: ['last 2 versions', '> 5%']}
	//"postcss-preset-env":												//??解析，但原来还存在
	"cssnano"																			//CSS 压缩器, 放在最后


	postcss-mixins							//@define-mixin icon $network  | @mixin icon twitter, blue;   @define-extend
	postcss-sass-extend					//@extend %placehold
	postcss-for									//@for $i from 1 to 3
	postcss-each								//@each  $icon in $list{ .icon-$icon{} }
	postcss-atroot

	postcss-nesting,						//嵌套的样式前面都需要一个& 
	postcss-nested							//SASS-LIKE嵌套

	//px2rem
	postcss-pxtorem				//css样式代码中将px写成Px或者PX他也不会转换成rem的~



/* 
"postcss-pxtorem": {
	rootValue: 75,
	unitPrecision: 5,
	propList: ['*'],
	selectorBlackList: [],
	replace: true,
	mediaQuery: false,
	minPixelValue: 12
}, 
*/

/* 
"postcss-sprites": {
	retina: true,
	verbose: true,
	spritePath: './src/sprites/',
	stylesheetPath: './src',
	basePath: './',

	//过滤一些不需要合并的图片
	filterBy: function (image) {
		// if (image.url.indexOf('images/sprites') === -1) {
		if (image.url.indexOf('images/temp') > -1) {
				return Promise.reject();
		}
		return Promise.resolve();
	},
	//雪碧图分组
	groupBy: function (image) {
		let icon = 'icon';
		let groups = /\/images\/sprites\/(.*?)\/.+/gi.exec(image.url);
		let groupName = groups ? groups[1] : icon;
		image.retina = true;
		image.ratio = 1;
		if (groupName) {
			let ratio = /@(\d+)x$/gi.exec(groupName);
			if (ratio) {
					ratio = ratio[1];
					while (ratio > 10) {
							ratio = ratio / 10;
					}
					image.ratio = ratio;
			}
		}
		return Promise.resolve(groupName);
	},
}, 
*/



//8-25 webpack常用插件
css-loader中importLoaders选项的作用是用于配置css-loader作用于 @import 的资源之前需要经过其他loader的个数。
@import 用于css源码中引用其他模块的关键字，如果你的项目中确定不会涉及模块化可以忽略此配置项；
如果需要将编译后的css文件独立导出，则需将style-loader[注]替换为extract-text-webpack-plugin，mini-css-extract-plugin