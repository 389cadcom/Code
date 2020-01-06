module.exports = function(){
	const presets = [
		
	]
	const plugins = [
		
	];
	return {
		presets,
		plugins
	}
}

{
	"presets":[
		["@babel/preset-env": {
				"loose": true,
				"modules": false,
				"useBuiltIns": "usage",
				"targets": {
					"node": "current",
					"chrome": 52,
					"browsers": ["last 2versions", "safari 7"]
				}
	  }]	
	]
}
//解析、转换、打印输出

//babel7删除 state的预设
babel-upgrade
npx babel-upgrade

-    "@babel/preset-stage-2": "^7.0.0",

+    "@babel/plugin-proposal-class-properties": "^7.0.0",
+    "@babel/plugin-proposal-decorators": "^7.0.0",
+    "@babel/plugin-proposal-export-namespace-from": "^7.0.0",
+    "@babel/plugin-proposal-function-sent": "^7.0.0",
+    "@babel/plugin-proposal-json-strings": "^7.0.0",
+    "@babel/plugin-proposal-numeric-separator": "^7.0.0",
+    "@babel/plugin-proposal-throw-expressions": "^7.0.0",
+    "@babel/plugin-syntax-dynamic-import": "^7.0.0",
+    "@babel/plugin-syntax-import-meta": "^7.0.0",

//@babel/preset-stage-2, 3
syntax-dynamic-import：									//动态import stage-3
transform-class-properties：						//用于 class 的属性转化
transform-object-rest-spread：					//用来处理 rest spread
transform-async-generator-functions：		//用来处理 async 和 await  @babel/preset-env    ES2017已实现


// Stage 1
"@babel/plugin-proposal-export-default-from",
"@babel/plugin-proposal-logical-assignment-operators",
["@babel/plugin-proposal-optional-chaining", { "loose": false }],
["@babel/plugin-proposal-pipeline-operator", { "proposal": "minimal" }],
["@babel/plugin-proposal-nullish-coalescing-operator", { "loose": false }],
"@babel/plugin-proposal-do-expressions",

// Stage 2
["@babel/plugin-proposal-decorators", { "legacy": true }],
"@babel/plugin-proposal-function-sent",
"@babel/plugin-proposal-export-namespace-from",
"@babel/plugin-proposal-numeric-separator",
"@babel/plugin-proposal-throw-expressions",

// Stage 3
"@babel/plugin-syntax-dynamic-import",
"@babel/plugin-syntax-import-meta",
["@babel/plugin-proposal-class-properties", { "loose": false }],
"@babel/plugin-proposal-json-strings"



//老版本  babel-preset-stage
//stage-1
babel-plugin-transform-class-constructor-call: "^6.24.1",
babel-plugin-transform-export-extensions: "^6.22.0",

//stage-2
babel-plugin-transform-class-properties: "^6.24.1",
babel-plugin-transform-decorators: "^6.24.1",
babel-plugin-syntax-dynamic-import: "^6.18.0",											//@babel/preset-env实现

//stage-3
babel-plugin-syntax-trailing-function-commas: "^6.22.0",
babel-plugin-transform-async-generator-functions: "^6.24.1",				//@babel/preset-env实现
babel-plugin-transform-async-to-generator: "^6.24.1",								//@babel/preset-env实现
babel-plugin-transform-exponentiation-operator: "^6.24.1",	
babel-plugin-transform-object-rest-spread: "^6.22.0"								//@babel/preset-env实现


//regeneratorRuntime is not defined报错, 解析async/await等es7语法，需要babel进行转换
//需引入@babel/plugin-tranform-runtime  @babel/runtime