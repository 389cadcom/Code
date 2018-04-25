1.rules
use: ['style-loader', 'css-loader'] //��ʹ�� css-loader ��ȡ CSS �ļ����ٽ��� style-loader �� CSS ����ע�뵽JS��

use: ExtractTextPlugin.extract({
	use: [{
		loader: 'css-loader',
		fallback: 'vue-loader',
		options: {
			minimize:true,
			camelCase: true
		}
	}]
})



2.devServer		//Ĭ��ʵʱԤ��--socketˢ����ҳ
//����			webpack  --config webpack.dev.js
--hot			//ֻ������������� DevServer ����ȥ�����ļ��������鵽ģ�����滻
--watch			//DevServerĬ�Ͽ����� webpack  --watch��������ģʽ��entry Ϊ���ȥ�ݹ������ entry ���������ļ�
--devtool source-map   //�������Դ���  chrome source
--open			//�Զ���ҳ��

devServer: {
	proxy: { // ������˷���ӿ�
      '/api': 'http://localhost:3000'
    },
	open: true,
	https: false,
	historyApiFallback:true
}

//������е�·��ʱ������һ��HTML �ļ�  http://webpack.wuhaolin.cn/2����/2-6DevServer.html
historyApiFallback: {
  // ʹ������ƥ������·��
  rewrites: [
    // /user ��ͷ�Ķ����� user.html
    { from: /^\/user/, to: '/user.html' },
    { from: /^\/game/, to: '/game.html' },
    // �����Ķ����� index.html
    { from: /./, to: '/index.html' },
  ]
}


3.resolve		//���ñ��� alias, ʡ�Ժ�׺ extensions
alias:
react$ ֻ�������� react ��β�ĵ������
//��ֻ��� import 'react' �ؼ����滻�� import '/path/to/react.min.js'