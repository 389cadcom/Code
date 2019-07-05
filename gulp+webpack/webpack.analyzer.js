/**
 * webpack打包分析
 * 
 * imports-loader, exports-loader
 */
(function(modules){
	//用于缓存已加载模块的组
	var installedModules = []

	//用于加载模块的require函数
	function __webpack_require__(moduleId){ }

	//加载入口模块(初始模块id=0)
	return __webpack_require__(0)
	
})([...])


//Runtime webpackBootstrap
(function(modules) {
	// The module cache
	var installedModules = {};

	// 定义加载依赖函数
	function __webpack_require__(moduleId) {

		// 检查缓存中是否有该模块，若有，则直接返回
		if (installedModules[moduleId]) {
			return installedModules[moduleId].exports
		}

		// 初始化一个新模块，并且保存到缓存中
		var module = installedModules[moduleId] = {
			i: moduleId,	// 模块名
			l: false,			// 布尔值，表示该模块是否加载完毕
			exports: {}		// 模块的输出对象，包含了模块输出的各个接口
		}

		// 执行模块函数，并传入三个实参：模块本身、模块的输出对象、加载函数，同时定义 this-->module.exports 值为模块的输出对象
		modules[moduleId].call(
			module.exports,
			module,
			module.exports,
			__webpack_require__
		)

		// 标记模块为已加载状态
		module.l = true

		// 返回模块的输出对象
		return module.exports
	}


	// expose the modules object (__webpack_modules__)
	__webpack_require__.m = modules;

	// expose the module cache
	__webpack_require__.c = installedModules;

	// define getter function for harmony exports
	__webpack_require__.d = function(exports, name, getter) {
		if(!__webpack_require__.o(exports, name)) {								//用于判断输出对象上是否已存在同名的输出接口
			Object.defineProperty(exports, name, { enumerable: true, get: getter });
		}
	};

	// define __esModule on exports
	__webpack_require__.r = function(exports) {
		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
		}
		Object.defineProperty(exports, '__esModule', { value: true });
	};

	// create a fake namespace object
	// mode & 1: value is a module id, require it
	// mode & 2: merge all properties of value into the ns
	// mode & 4: return value when already ns object
	// mode & 8|1: behave like require
	__webpack_require__.t = function(value, mode) {
		if(mode & 1) value = __webpack_require__(value);
		if(mode & 8) return value;
		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
		var ns = Object.create(null);
		__webpack_require__.r(ns);
		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
		return ns;
	};

	// getDefaultExport function for compatibility with non-harmony modules
	__webpack_require__.n = function(module) {
		var getter = module && module.__esModule ?
			function getDefault() { return module['default']; } :
			function getModuleExports() { return module; };
		__webpack_require__.d(getter, 'a', getter);
		return getter;
	};

	// Object.prototype.hasOwnProperty.call
	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

	// __webpack_public_path__
	__webpack_require__.p = "";


	// Load entry module and return exports
	// 加载执行入口模块
	return __webpack_require__(__webpack_require__.s = "./src/main.js");
})
/********************模块总数列表对象*************************************/
({
 "./src/amd/amd.require.js":
 (function(module, exports, __webpack_require__) {
		var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
		!(
			__WEBPACK_AMD_DEFINE_ARRAY__ = [],
			__WEBPACK_AMD_DEFINE_RESULT__ = (function(){
				return {
					say(){
						alert('Hello')
					}
				}
			}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)
			
			if(__WEBPACK_AMD_DEFINE_RESULT__ !==undefined){
				module.exports = __WEBPACK_AMD_DEFINE_RESULT__
			}
		)
 }),

 "./src/main.js":
 (function(module, exports, __webpack_require__) {  //执行factory函数, 获取返回值作为模块内容, 返回值不为空, 则通过module.exports返回
		var __WEBPACK_AMD_DEFINE_ARRAY__, 							//AMD依赖列表
			  __WEBPACK_AMD_DEFINE_RESULT__;							//AMD factory函数的返回值，即导出的模块内容
		!(
			//引入依赖 apply(this, arr)
			__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! ./amd/amd.require.js */ "./src/amd/amd.require.js\")]  
			__WEBPACK_AMD_DEFINE_RESULT__ = (function(amd){
				amd.say()
			}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__);
			
			//导出
			if(__WEBPACK_AMD_DEFINE_RESULT__ !==undefined){
				module.exports = __WEBPACK_AMD_DEFINE_RESULT__
			}
		)
 	})
});

/**commonjs模块列表*/
({
	"./src/commonjs/cmd.js":
	(function(module, exports){
		var obj = {
			say(){
				alert('Hello');
			}
		}
		module.exports = obj
	}),
	"./src/main.js":
	(function(module, exports, __webpack_require__){
		const obj = __webpack_require__("./src/commonjs/cmd.js")
		obj.say()
	})
})


/**
 * UMD声明的模块
 * 默认按照AMD的方式去打包 if(typeof define === 'function' && define.amd)
	*/
({
	"./src/umd/umd.js":
	(function(module, exports, __webpack_require__) {
		var __WEBPACK_AMD_DEFINE_FACTORY__, 
				__WEBPACK_AMD_DEFINE_ARRAY__, 
				__WEBPACK_AMD_DEFINE_RESULT__;
		(function(root, factory){
			if(true){
				!(
					__WEBPACK_AMD_DEFINE_ARRAY__ = [], 
					__WEBPACK_AMD_DEFINE_FACTORY__ = (factory)
					
					if(typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function'){
						__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)
					}else{
						__WEBPACK_AMD_DEFINE_FACTORY__
					}
					//导出
					if(__WEBPACK_AMD_DEFINE_RESULT__ !== undefined){
						module.exports = __WEBPACK_AMD_DEFINE_RESULT__
					}
			}else {}
		)(this, function(){
			return {say(){
				alert('Hello')
			}
		})
	}),
	"./src/main.js":
	(function(){
		var obj = __webpack_require__("./src/umd/umd.js");
		obj.say()
	})
})