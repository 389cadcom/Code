/* 设置babel的cacheDirectory为true(打包性能提升很明显)
var options = {
    presets: ['es2015', 'react', 'stage-0'],
    plugins: ['transform-runtime', 'add-module-exports', 'typecheck', "transform-decorators-legacy"],
    cacheDirectory: true
}

删除 node_modules
rimraf node_modules

*/


//默认只转换语法，不转换新的API
1.babel-core							//核心API，调用Babel的API进行转码，就要使用babel-core模块

2.babel-node							//REPL环境、直接执行行脚本  如：babel-node src/test.js

3.babel-doctor

4.babel-polyfill						//为当前环境提供一个垫片

5.babel-runtime	(_extend, callback)     //提取模块复用工具函数,提供工具函数,减少重复代码	_extend()， classCallCheck()工具函数
//babel-plugins-transform-runtime

6.babel-register						//改写require命令, 用import代替require，import的优点可以引入所需方法或者变量，不需要加载整个模块，提高了性能



//编译
babel es6.js  --preset es2015

babel es6.js -o es5.js			//--out-file

babel src -d lib				//--out-dir 


//执行脚本 node  babel-node
node  test.js, babel-node test.js

//babel-node	REPL环境
Modules aren't supported in the REPL

//正确:	直接执行脚本文件
babel-node module.js;


//注：
编译后的JS程序有时需依赖polyfill模块，需引入require('babel-polyfill');

babel-polyfill则是通过改写全局prototype的方式实现，比较适合单独运行的项目。
开启babel-polyfill的方式，可以直接在代码中require，或者在webpack的entry中添加，
也可以在babel的env中设置useBuildins为true来开启。