 new BrowserSyncPlugin({
	// browse to http://localhost:3000/ during development,
	// ./public directory is being served
	host: 'localhost',
	port: 3000,
	proxy: 'localhost:8765'
}),
devServer: {
	contentBase: path.join(__dirname, 'dist'),
	publicPath: '/assets',
	host: "0.0.0.0",
	compress: true,
	hot: true
}



devServer: {
	// --���߷������������ṩ���ݡ���ֻ��������Ҫ�ṩ��̬�ļ�ʱ����Ҫ������ͼƬ����
	contentBase: path.join(__dirname, 'dist'),
	// contentBase: false,
	// --���߷������ۿ���devServer.contentBaseѡ���ṩ���ļ����ļ����Ľ���������ҳ�����¼��ء�
	watchContentBase: true,
	// --��������������gzipѹ��
	compress: true,
	port: 9997,
	host: '0.0.0.0',
	// --�����ʹ���ȸ��µı�־��Ȼ�󲢲��ṩ�ȸ��¹��ܣ���Ҫ����hotModule
	// hot:true, ������HotModuleReplacementPlugin����ΪAPI�޷���������webpack����
	// --hot������� ����ΪCLI���Է�������webpack���ã�
	hot: true,
	// --�ڹ���ʧ�ܵ�����£�������ģ���滻�������devServer.hot������ˢ��ҳ����Ϊ���ˡ�
	hotOnly: true,
	// --devtool����̨��ʾ��Ϣ
	clientLogLevel: 'none', //none, info, (warning,error һֱ�У�
	// --�ӳٱ��룬�����첽ģ�飬ֻ��������ʱ�Ż���룬�������в���Ҫ
	lazy: true,
	filename: "bundle.js",
	// --Ϊ���������������ͷ
	headers: {
		"X-Custom-Foo": "bar"
	},
	// --ʹ��HTML5 History APIʱ��ϵͳ���ܻ����index.html��ҳ��ȡ��404��Ӧ
	historyApiFallback: true,
	/*historyApiFallback: {
	   rewrites: [
		 { from: /^\/$/, to: '/views/landing.html' },
		 { from: /^\/subpage/, to: '/views/subpage.html' },
		 { from: /./, to: '/views/404.html' }
	   ]
	}*/
	https: true, //ʹ��httpsЭ��
	// --�ڿ��������������ֲ�ͬģʽ֮���л�(--inline, --iframe)��Ĭ������£���ʹ������ģʽ����Ӧ�ó�������ζ��һ���ű������뵽���İ����Դ���ʵʱ���¼��أ����ҹ�����Ϣ����ʾ�����������̨�С�
	inline: true,
	// --����webpack����ǵ���Ϣ
	noInfo: true,
	// --ʹ�ô�����Ҫ http-proxy-middleware  �����,���Ӻ�̨�ӿڵ�ʱ��ʹ��
	proxy: {
		"/api": "http://localhost:3000"
	    /*"/api": {
			target: "http://localhost:3000",
			pathRewrite: {"^/api" : ""},
			secure: false
	    }*/
	},
	public: "myapp.test:80",
	// --Ҳ�Ǿ�̬�ļ���Ŀ¼�� �൱�� output.publicPath
	publicPath: "/assets/",
	// --���ð������ܺ󣬳��˳�ʼ������Ϣ֮����κ����ݶ���д�����̨����Ҳ��ζ������webpack�Ĵ���򾯸治�ɼ���
	quiet: true
}