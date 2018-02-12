[path], [name], [ext]

[hash], [chunkhash]  [contenthash]


//一.安装版本
npm i webpack@1.x  webpack-dev-server@1.x

//
webpack --config	//#执行自定义webpack.config

webpack				//#最基本的启动webpack命令
webpack -w 			//#提供watch方法，实时进行打包更新watch
webpack -p			//#对打包后的文件进行压缩
webpack -d			//#提供SourceMaps，方便调试
webpack --colors	//#输出结果带彩色，比如：会用红色显示耗时较长的步骤
webpack --profile	//#输出性能数据，可以看到每一步的耗时
webpack --display-modules //#默认情况下 node_modules 下的模块会被隐藏，加上这个参数可以显示这些被隐藏的模块
webpack --display-error-details //#显示编译出错信息


//环境变量: cross-env NODE_ENV=development
if (process.env.NODE_ENV === 'production') {
    module.exports.plugins = (module.exports.plugins || []).concat([])
}

//二.入口、出口
entry, output


//三.加载器		module：{loaders:[])
1.babel@6.x 大版本要一致  npm install babel-core babel-preset-es2015 babel-loader

有三种方式使用 loader:
/*
通过webpack.config.js配置
使用 require 语句中显示使用
通过 webpack CLI					webpack entry.js build.js  --module-bind "css=style-loader!css-loader"	
*/
/*
test:		一个必须满足的条件
exclude:	一个排除的条件
include:	要用Loader转换的导入文件的路径数组
loader:		一个用"！"隔开 loader的字符串
loaders:	一个loader字符串的数组
options:
query：		为loaders提供额外的设置选项（可选）
*/

//注：loader/query可以和options可以在同一级使用，但是不要使用use和options在同一级使用
{test: /\.css$/, use: 'css-loader'}
{test: /\.css$/, loader: 'css-loader'，options: { modules: true }}
{test: /\.css$/, use: {
    loader: 'css-loader',
    options: {
      modules: true
    }
}}

//但如果文件小于限制，可以返回 data URL   8k = 8192
{
    test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,		
    loader: 'url-loader',
    options: {
        limit: 8192,
        name: 'fonts/[name].[hash:7].[ext]'
    }
}

//#资源文件问题
1.引用src目录的图片，通过file-loader，生成在dist根目录
loader: 'file-loader',
options: {
	name: 'assets/[name].[ext]?[hash:4]'
	publicPath: 'assets/',                 //自定义公共路径
    outputPath: 'images/'                  //??
}
2.引用static资源



//四.插件	plugins:[]
1.依赖第三插件，并将第三方插件独立打包 
vendor
CommonChunkPlugin(chunkName, fileName)

2.引入第三方插件不另外打包
webpack.ProvidePlugin

3.公开全局变量 
//import $ from 'jquery';
//var $ = require('jquery');
externals:{
	jquery: 'window.jQuery',		//factory(require('jquery'))
	$: 'jquery'
}

/**
引用jquery及jquery插件
*/
1.如果jquery插件没有采用任何模块化方案，直接引用cdn上的jQuery，正常引用插件并打包就可以正常使用。

2.若是模块UMD形式，则需要设置全局接口externals
//a.先引用     b.定义全局接口		c.打包第三方插件


//#热启动
1.在package.json 中设置--open --hot参数
2.若在webpack.config.js中配置，需添加webpack.HotModuleReplacementPlugin:

module.exports = {
    devServer: {
        historyApiFallback: true,		// 任意的 404 响应都替代为 index.html
        hot: true,						// 启用 webpack 的模块热替换特性
        inline: true					// 启用内联模式
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
}


//五.解析(Resolve)，配置路径
resolve: {
  alias: {
    'vue$': 'vue/dist/vue.esm.js',
    '@': path.join(__dirname, 'src')
  },
  extensions: ['.js', '.vue', '.css']
}

import tab from '@/components/tab'