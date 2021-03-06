1.动态加载 import(/*webpackChunkName: 'lodash'*/ 'lodash')
  需安装  babel-plugin-syntax-dynamic-import

2.使用 async, await
  需安装  babel-plugin-transform-runtime


//vendor: Object.keys(pkg.dependencies)

/*
	Code Splitting				//文件分割成块, 按需加载  require.ensure([], ()=>{})

	Tree Shaking					//剔除无效、没有使用的代码  UglifyJsWebpackPlugin  puitycss-webpack

	Scope hoisting				//作用域提升 ModuleConcatenationPlugin    必须是ES2015 的模块语法写
*/

require.ensure([], function(){/*require('loadsh')*/ })

me = () => import(/*webpackChunkName: "me" */ './page/me.vue')		//vue-router路由懒加载
Vue.component(Me, me)

window.addEventListener('click', ()=>{
	import(/* webpackChunkName: 'styles'*/ './common')							//异步加载css
}, false)




//optimization参数
object { 
	checkWasmTypes?, chunkIds?, concatenateModules?, 
	flagIncludedChunks?, hashedModuleIds?, mangleWasmImports?, 
	mergeDuplicateChunks?, minimize?, minimizer?, moduleIds?, 
	namedChunks?, namedModules?, noEmitOnErrors?, nodeEnv?, 
	occurrenceOrder?, portableRecords?, providedExports?, 
	removeAvailableModules?, removeEmptyChunks?, runtimeChunk?, 
	sideEffects?, splitChunks?, usedExports? 
}