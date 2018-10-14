optimization: {
	splitChunks: {
		cacheGroups: {
			//priorityȨ��, �ȴ��node_modules�е��ļ�, �ٴ��ҵ���й�������
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
 * 1. ��Ե�ҳӦ����ȡ����������Ҫͨ������ָ��������
 * 2. ����ָ����������ͨ������д����ʵ�֣�������ͨ��webpack������ʵ�֡��������: ./src/page.js
			const page = () => import(/* webpackChunkName: 'page' */ "./src/page")
 */
 module.exports = {
	output: {
		path: path.resolve('dist'),
		filename: 'js/[name].js',
		chunkFilename: 'js/[name].[chunk].js'
	}
}
