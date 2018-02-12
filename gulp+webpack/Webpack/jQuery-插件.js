/*1.先引入     2.打包第三方插件       3.定义全局接口  
1.var $ = jQuery = require('jquery');			//非模块方式定义插件

2.vendor: ['jquery']
new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js');

3.externals:{'jquery':'window.jQuery'}
*/

2.
 let webpackConfig = {
  resolve: {
    extensions: ['', '.js', '.vue'],
    fallback: [path.join(__dirname, '../node_modules')],
	//别名
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
Vue spa应用使用jquery插件

<template>
使用jquery插件， externals定义全局jquery
</template>

<script>
//import 'slick';
import '../static/slick/slick.min';				//es6引入插件

export default{
	name:'app',
	mounted:function(){
		this.slideFn();
	},
	methods:{
		slideFn(){
			$('.slider').slick({				//跟平常使用组件一样
				
			})
		}
	}
}
</script>
*/

/**
1、如何引入 jQuery？
2、如何引入 jQuery 插件？
3、如何引入不依赖 jQuery 的普通第三方插件？

注：如果要全局引用jQuery，不管你的jQuery有没有支持模块化，用externals就对了。
*/

1.
jQuery 直接在 html 中引入，然后在 webpack 中把它配置为全局即可
externals: {
	jquery: 'jQuery'
}

使用时直接引入，反正 webpack 也不会把它打包进来
import $ from jquery,  

var $ = require('jquery');
//若没用引入，则使用全局的jQuery

2.插件需区分模块还是老式$.fn定义的方式



3.我对于第三方的插件的做法就是以前该怎么引入就怎么引入，在 webpack 中设置一个全局即可

webpack.providePlugin()
export-loader