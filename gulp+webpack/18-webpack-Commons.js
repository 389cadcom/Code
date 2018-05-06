//1.�������ȷָ���������� chunk����ûָ����ϲ�����һ��chunk name --> utils
entry: {
  vendor: ['jquery']
},
plugins: [
  new webpack.optimize.CommonsChunkPlugin({
    name: ['utils', 'vendor', 'runtime'],
    filename: '[name].js',
  }),
]

//2.ͨ��������ʽ���ȼ۵�һ�ַ�ʽ������ֿ�д��
plugins: [
  new webpack.optimize.CommonsChunkPlugin({
    name: 'utils',
    filename: '[name].js',
    chunks: ['first', 'second']
  }),
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    filename: '[name].js'
  }),
  new webpack.optimize.CommonsChunkPlugin({
    name: 'runtime',
    filename: '[name].js',
    chunks: ['vendor']
  }),
]

//3.����Ҫָ�������������ݣ� �����ж�����node_modules�ĵ�������
plugins: [
  //1.�Ȱ��������ģ���ȡ��������
  //��first.js��second.js�г�ȡcommons chunk
  new webpack.optimize.CommonsChunkPlugin({
    name: 'common',
    filename: '[name].js',
    chunks: ['first', 'second']
  }),
  //2.�ٳ�ȡ������ģ��
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    filename: '[name].js',
    //�����ж�����Щģ��ᱻ���뵽vendor��
    minChunks: function (module, count) {
      console.log(module.resource, `���ô���${count}`);
      return (
        module.resource &&
        /\.js$/.test(module.resource) &&
        module.resource.indexOf(path.join(__dirname, './node_modules')) === 0
      )
    }
  }),
  //3.�����webpack���е��ļ���������
  new webpack.optimize.CommonsChunkPlugin({
    name: 'runtime',
    filename: '[name].js'
  }),
]

//4.minChunks�����������ж��Զ���������߼��ļ�-->����ɹ���ģ��
plugins: [
  //��ȡ������������
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor'
  }),
  //�����ȡ--�߼���������ģ��
  new webpack.optimize.CommonsChunkPlugin({
    name: 'utils',
    minChunks: function (module, count) {
      console.log(module.resource, module.context.indexOf('assets'));
      return (
        module.context &&
        /\.js$/.test(module.resource) &&
        module.context.indexOf('assets') !== -1
      )
    }
  }),
  //��ȡ����ʱ������ļ�manifest--> runtime
  new webpack.optimize.CommonsChunkPlugin({
    name: "manifest",
    minChunks: Infinity
  })
]