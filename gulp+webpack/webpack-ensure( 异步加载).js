object { 
	checkWasmTypes?, chunkIds?, concatenateModules?, 
	flagIncludedChunks?, hashedModuleIds?, mangleWasmImports?, 
	mergeDuplicateChunks?, minimize?, minimizer?, moduleIds?, 
	namedChunks?, namedModules?, noEmitOnErrors?, nodeEnv?, 
	occurrenceOrder?, portableRecords?, providedExports?, 
	removeAvailableModules?, removeEmptyChunks?, runtimeChunk?, 
	sideEffects?, splitChunks?, usedExports? 
}


//vendor: Object.keys(pkg.dependencies)

/*
	Code Splitting				//�ļ��ָ�ɿ�, �������  require.ensure([], ()=>{})

	Tree Shaking					//�޳���Ч��û��ʹ�õĴ���  UglifyJsWebpackPlugin  puitycss-webpack

	Scope hoisting				//���������� ModuleConcatenationPlugin    ������ES2015 ��ģ���﷨д
*/

require.ensure([], function(){/*require('loadsh')*/ })

me = () => import(/*webpackChunkName: "me" */ './page/me.vue')		//vue-router·��������

window.addEventListener('click', ()=>{
	import(/* webpackChunkName: 'styles'*/ './common')							//�첽����css
}, false)
