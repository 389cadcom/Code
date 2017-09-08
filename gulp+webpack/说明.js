//一.安装版本
npm i webpack@1.x  webpack-dev-server@1.x

//二.命令编译参数
webpack --watch   //监听变动并自动打包
webpack --color
webpack -p		  //压缩混淆脚本，这个非常非常重要！
webpack -d		  //生成map映射文件，告知哪些模块被最终打包到哪里了

--progress	--color
--display-error-details

//自定义参数: cross-env NODE_ENV=development
console.log(process.env.NODE_ENV);

webpack entry.js build.js  --module-bind "css=style-loader!css-loader"	//命令模式



//三.模式	module：{loaders:[])
1.@6.x 大版本要一致  npm install babel-core babel-preset-es2015 babel-loader
/*
test：  一个匹配loaders所处理的文件的拓展名的正则表达式（必须）
loader：loader的名称（必须）
include/exclude:手动添加必须处理的文件（文件夹）或屏蔽不需要处理的文件（文件夹）（可选）；
query： 为loaders提供额外的设置选项（可选）
*/


2.style-loader!css-loader?modules

//1.样式loader
A.打包合并入JS文件
{test: /\.css$/, loader: "style-loader!css-loader" }   

B:抽取独立文件
{test: /\.css$/, loader: ExtractTextPlugin.extract("style", "css!postcss")},

plugins:[
  new ExtractTextPlugin('css/[name].css'),
]

C:多文件抽取



//四.插件	plugins:[]
1.依赖第三插件，并将第三方插件独立打包 
vendor
CommonChunkPlugin(chunkName, fileName)

2.引入第三方插件不另外打包
webpack.ProvidePlugin

3.公开全局变量 
//import $ from 'jquery'  var $ = require('jquery');
externals:{
	$: 'jquery'
}


/**
引用jquery及jquery插件
*/
1.如果jquery插件没有采用任何模块化方案，直接引用cdn上的jQuery，正常引用插件并打包就可以正常使用。

2.