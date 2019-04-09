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

//babel7删除 state的预设
npmx babel-upgrade

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

//@babel/preset-stage-2
syntax-dynamic-import： 动态import
transform-class-properties：用于 class 的属性转化
transform-object-rest-spread：用来处理 rest spread
transform-async-generator-functions：用来处理 async 和 await
