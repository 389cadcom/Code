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

//babel7ɾ�� state��Ԥ��
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
syntax-dynamic-import�� ��̬import
transform-class-properties������ class ������ת��
transform-object-rest-spread���������� rest spread
transform-async-generator-functions���������� async �� await
