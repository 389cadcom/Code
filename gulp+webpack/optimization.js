optimization: {
	splitChunks: {
		cacheGroups: {
			//priority权重, 先打包node_modules中的文件, 再打包业务中公共代码
			common: {
				name: 'common',
				chunks: "all",
        minSize: 1,
        priority: 0
			},
			vendor: {
				name: 'vendor',
				test: /[\\/]node_modules[\\/]/,
				chunks: "all",
        priority: 10
			}
		}
	}
}

/** JS Tree Shaking, Css Tree Shanking, Split Code
 *
 * 1. 针对单页应用提取公共代码需要通过代码分割和懒加载
 * 2. 代码分割和懒加载是通过代码写法来实现，并不是通过webpack配置来实现。更多请见: ./src/page.js
			const page = () => import(/* webpackChunkName: 'page' */ "./src/page")
 */
 module.exports = {
	output: {
		path: path.resolve('dist'),
		filename: 'js/[name].js',
		chunkFilename: 'js/[name].[chunk].js'
	}
}
