/*1.������     2.������������       3.����ȫ�ֽӿ�  
1.var $ = jQuery = require('jquery');			//��ģ�鷽ʽ������

2.vendor: ['jquery']
new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js');

3.externals:{'jquery':'window.jQuery'}
*/

2.
 let webpackConfig = {
  resolve: {
    extensions: ['', '.js', '.vue'],
    fallback: [path.join(__dirname, '../node_modules')],
	//����
    alias: {
      'vue$': 'vue/dist/vue.js',
      'src': path.resolve(__dirname, '../src'),
      'assets': path.resolve(__dirname, '../src/assets'),
      'components': path.resolve(__dirname, '../src/components'),
      'jquery': path.resolve(__dirname, '../src/js/jquery.js'),
      'moment':path.resolve(__dirname, '../src/plugins/daterangepicker/moment.js'),
      'iCheck':path.resolve(__dirname, '../src/plugins/iCheck/icheck.min.js'),
      'daterangepicker': path.resolve(__dirname, '../src/plugins/daterangepicker/daterangepicker.js')
    }
  },

  plugins:[
    new webpack.ProvidePlugin({
		  'moment':'moment',
		  $:"jquery",
		  jQuery:"jquery",
		  "window.jQuery":"jquery",
		  iCheck: "iCheck",
		  daterangepicker: "daterangepicker"
    })
  ]
}


/*
Vue spaӦ��ʹ��jquery���

<template>
ʹ��jquery����� externals����ȫ��jquery
</template>

<script>
//import 'slick';
import '../static/slick/slick.min';				//es6������

export default{
	name:'app',
	mounted:function(){
		this.slideFn();
	},
	methods:{
		slideFn(){
			$('.slider').slick({				//��ƽ��ʹ�����һ��
				
			})
		}
	}
}
</script>
*/

/**
1��������� jQuery��
2��������� jQuery �����
3��������벻���� jQuery ����ͨ�����������

ע�����Ҫȫ������jQuery���������jQuery��û��֧��ģ�黯����externals�Ͷ��ˡ�
*/

1.
jQuery ֱ���� html �����룬Ȼ���� webpack �а�������Ϊȫ�ּ���
externals: {
	jquery: 'jQuery'
}

ʹ��ʱֱ�����룬���� webpack Ҳ��������������
import $ from jquery,  

var $ = require('jquery');
//��û�����룬��ʹ��ȫ�ֵ�jQuery

2.���������ģ�黹����ʽ$.fn����ķ�ʽ



3.�Ҷ��ڵ������Ĳ��������������ǰ����ô�������ô���룬�� webpack ������һ��ȫ�ּ���

webpack.providePlugin()
export-loader