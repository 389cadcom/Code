//导出-->
//exports.method = , module.exports = {},  exports = modulex.exports = {}

//export {}, export default

//导入-->
require('xxx').default

//React定义
var React$2 = Object.freeze({
	default: React
});

var React$3 = ( React$2 && React ) || React$2;

var react = React$3.default || React$3;

module.exports = react;


//自动导入 requie.context
const files = require.context('./', false, /\.vue$/)
files.keys().forEach(file => {
	let name = file.replace(/^\.\/|\.vue$/g, '').replace(/\//, '-')
	let component = files(file)

	Vue.component(name, component.default || component)
})


//ES6  Module.default, Module.__esModule = true

/**
 * es6引入    1.export default导出, import直接引用; 若 * as lib则需引用default属性  
 * cjs引入    2.export导出则跟cjs一致, 解构使用对应的导出名
 * require.context引用
 */

//node 
(function(exports, require, module, __filename, __dirname){
})

(function(modules){
		//modules[moduleId].call(module.exports, module, module.exports, __webpack_require__)
})([module1, module2])



//1.ES6定义 -- 打包则转换重置原来属性，添加'default'
(function(module, __webpack_exports__, __webpack_require__){
	__webpack_require__.r(__webpack_exports__);

	//a.default导出
	__webpack_exports__["default"] = (function(){ })
	__webpack_exports__["default"] = ({ add, total })

	//b.export导出
	__webpack_require__.d(__webpack_exports__, 'add', function(a, b){ return a + b })
})


//2.CJS定义, 使用function(module, exports){}包裹
(function(module, exports){
	module.exports = function reduce(a, b){
		return a - b
	}
})




//如何转义ES5，不含有模块化方式;   BS4去除import, export声明 babel-plugin-transform-modules-strip		
/*
	__webpack_require__:
		i, l, 
		m：保存传入的模块对象
		c：保存缓存的模块
		d：在exports对象上添加可枚举属性 getter
		r：在exports对象上添加__esModule，用于标识es6模块
		n：getDefaultExport获取模块导出的接口(es6的默认导出default)
		o：判断对象上是否有某一属性, 用于在exports添加属性过滤
		e: 动态加载函数

		执行入口模块
		module[moduleId].call(module.exports, module, module.exports, __webpack_require__)


		使用splitChunks: webpackJsonCallback

		//动态加载
		import(/*webpackChunkName:'chunks'/'./libs/promise.js').then( res => {
			console.log(res)
		})

*/
