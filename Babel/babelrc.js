//解析，转换和生成
{   presets: [],   plugins: [] }

//预设presets  --> plugins的组合				http://babeljs.io/docs/plugins/
env, es2015, es2016, es2017, latest, react		//latest  --> babel-preset-env代替

//{paresets: ['es2015']}

check-es2015-constants					// 检验const常量是否被重新赋值
transform-es2015-arrow-functions		// 编译箭头函数
transform-es2015-block-scoped-functions	// 函数声明在作用域内
transform-es2015-block-scoping			// 编译const和let
transform-es2015-classes				// 编译class
transform-es2015-computed-properties	// 编译计算对象属性
transform-es2015-destructuring			// 编译解构赋值
transform-es2015-duplicate-keys			// 编译对象中重复的key，其实是转换成计算对象属性
transform-es2015-for-of					// 编译for...of
transform-es2015-function-name			// 将function.name语义应用于所有的function
transform-es2015-literals				// 编译整数(8进制/16进制)和unicode
transform-es2015-modules-commonjs		// 将modules编译成commonjs
transform-es2015-object-super			// 编译super
transform-es2015-parameters				// 编译参数，包括默认参数，不定参数和解构参数
transform-es2015-shorthand-properties	// 编译属性缩写
transform-es2015-spread					// 编译展开运算符
transform-es2015-sticky-regex			// 正则添加sticky属性
transform-es2015-template-literals		// 编译模版字符串
transform-es2015-typeof-symbol			// 编译Symbol类型
transform-es2015-unicode-regex			// 正则添加unicode模式
transform-regenerator					// 编译generator函数



//Stage-X
babel-preset-stage-4:					// 何转换都是尚未被批准为发布Javascript的语言
syntax-trailing-function-commas			// function最后一个参数允许使用逗号（ES8已经存在）
transform-async-to-generator			// 把async函数转化成generator函数（ES8已经存在）
transform-exponentiation-operator		// 编译幂运算符（ES7已经存在）

babel-preset-stage-3：					//除了stage-4的内容，还包括以下插件：
transform-object-rest-spread			// 编译对象的解构赋值和不定参数
transform-async-generator-functions		// 将async generator function和for await编译为es2015的generator。


babel-preset-stage-2：					//除了stage-3的内容，还包括以下插件：

syntax-dynamic-import					// 动态加载模块
transform-class-properties				// 编译静态属性(es2015)和属性初始化语法声明的属性(es2016)。
//transform-decorators					已禁用的等待提案更新（可以在此期间使用旧版转换）


babel-preset-stage-1：
transform-class-constructor-call(弃用)	// 编译class中的constructor，在Babel7中会被移除
transform-export-extensions				// 编译额外的export语法，如export * as ns from "mod";细节可以看这个。


babel-preset-stage-0：
transform-do-expressions				// 编译do表达式
transform-function-bind					// 编译bind运算符，即::



//配置参数
{
  "presets": ["env", options]
}
/*
targets.node			支持到哪个版本的 node
targets.browsers		支持到哪个版本的浏览器
loose					启动宽松模式，配合 webpack 的 loader 使用
modules					使用何种模块加载机制
debug					开启调试模式
include					包含哪些文件
exclude					排除哪些文件
useBuiltIns				是否对 babel-polyfill 进行分解，只引入所需的部分
*/



/*********************************Babel 插件(plugins)************************************/
