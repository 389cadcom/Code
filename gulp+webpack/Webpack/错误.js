1.ʹ��extract-text-webpack-plugin ���ɵ�����cssʱ�����ܻᱨ��chunk.sortModules is not a function
//��������ǻ���extract-text-webpack-plugin�汾�ŵ�2.1.2��npm i extract-text-webpack-plugin@2.1.2

2.һ���ѹ��js����޷�ѹ��es6��������es6�������ѹ����
//����ʹ��UglifyjsWebpackPlugin��

3.Unexpected token: name (doc)
//��������ǽ�babel�����ó�������Ҫ����webpack.config�У������ķŵ�.babelrc�С�

4.ʹ����extract-text-webpack-plugin���޷�����cssѹ����
//����ʹ��optimize-css-assets-webpack-plugin��һ����������


webpack��gulp���

webpack��������һ��������ߣ�֧��CMD���﷨�����������������js�ļ������һ��js�ļ�

gulp����һ���Զ������ߣ���������less���룬����ѹ����Щ��gulp�ĺ��ĸ����ǹܵ���
�����ļ��ڹܵ�����ͨ��Ȼ�������Ĺ��������ν��д���ѹ����less����Ȳ���������ٽ���Щ�ļ��������ָ��Ŀ¼



//loader��query��options������ͬһ������use������optionsͬһ��ʹ��
rules:[
	{test:/\.css$/, loader:'style-loader!css-loader' },						//loader��ʽ
	{test:/\.css$/,  use:'style-loader!css-loader'},						//use��ʽ
	{test:/\.css$/,  use:['style-loader', 'css-loader']},					//use����

	{test:/\.css$/,  use:[{loader:'style-loader'}, {loader:'css-loader'}]},	//use�������

	{
	 test:/\.scss/,										//��ȡ�ļ�use, fallback
	 use: ExtractTextPlugin.extract({
	    use:'css-loader!sass-loader',
		fallback: 'style-loader'
	 })
	}
]