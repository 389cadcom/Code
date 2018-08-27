Autoprefixer
@imports
$variables
@extends
Nested class
Mixins



precss								//满足SASS开发者的习惯，继承了很多插件		
	postcss-mixins			//@define-mixin icon $network  | @mixin icon twitter, blue;   @define-extend
	postcss-sass-extend	//@extend %placehold
	postcss-for
	postcss-each
	postcss-atroot
	postcss-extend

	postcss-nesting,		//嵌套的样式前面都需要一个& 
	postcss-nested			//SASS-LIKE嵌套

//px2rem
postcss-pxtorem				//css样式代码中将px写成Px或者PX他也不会转换成rem的~
postcss-bem						//


//像scss一样编写
postcss-nested				//Sass 嵌套规则的写法
postcss-simple-vars		//像sass那样支持变量使用的插件
postcss-mixins				//提供了自定义mixin的功能
postcss-scss					//允许你同时使用SCSS注释--parser:'postcss-scss'（但不支持把SCSS编译成CSS）


//8-25 webpack常用插件
css-loader中importLoaders选项的作用是用于配置css-loader作用于 @import 的资源之前需要经过其他loader的个数。
@import 用于css源码中引用其他模块的关键字，如果你的项目中确定不会涉及模块化可以忽略此配置项；
如果需要将编译后的css文件独立导出，则需将style-loader[注]替换为extract-text-webpack-plugin，mini-css-extract-plugin