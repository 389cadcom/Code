//装饰器-decorator必要插件   decorators必需在class-properties之前
"@babel/plugin-proposal-decorators"							//{legacy: true}
"@babel/plugin-proposal-class-properties"				//{loose: true}
	
module.exports = {
  presets: ["@vue/cli-plugin-babel/preset"]
}

@vue/cli-plugin-babel/preset -->  @vue/babel-preset-app
																	@babel/core

	"@babel/core": "^7.8.4",
	"@babel/helper-compilation-targets": "^7.8.4",
	"@babel/helper-module-imports": "^7.8.3",
	"@babel/plugin-proposal-class-properties": "^7.8.3",							//类的属性、静态属性
	"@babel/plugin-proposal-decorators": "^7.8.3",										//装饰器
	"@babel/plugin-syntax-dynamic-import": "^7.8.3",									//import()动态导入
	"@babel/plugin-syntax-jsx": "^7.8.3",
	"@babel/plugin-transform-runtime": "^7.8.3",
	"@babel/preset-env": "^7.8.4",
	"@babel/runtime": "^7.8.4",
	"@vue/babel-preset-jsx": "^1.1.2",
	"babel-plugin-dynamic-import-node": "^2.3.0",
	"core-js": "^3.6.4",
	"core-js-compat": "^3.6.4"


@babel/preset-env@7.8
	"@babel/compat-data": "^7.8.0",
	"@babel/helper-compilation-targets": "^7.8.7",
	"@babel/helper-module-imports": "^7.8.3",
	"@babel/helper-plugin-utils": "^7.8.3",
	"@babel/plugin-proposal-async-generator-functions": "^7.8.3",				//async, await
	"@babel/plugin-proposal-dynamic-import": "^7.8.3",									//import()
	"@babel/plugin-proposal-json-strings": "^7.8.3",
	"@babel/plugin-proposal-nullish-coalescing-operator": "^7.8.3",
	"@babel/plugin-proposal-numeric-separator": "^7.8.3",
	"@babel/plugin-proposal-object-rest-spread": "^7.9.0",
	"@babel/plugin-proposal-optional-catch-binding": "^7.8.3",
	"@babel/plugin-proposal-optional-chaining": "^7.9.0",
	"@babel/plugin-proposal-unicode-property-regex": "^7.8.3",
	
	"@babel/plugin-syntax-async-generators": "^7.8.0",									//async
	"@babel/plugin-syntax-dynamic-import": "^7.8.0",										//import()
	"@babel/plugin-syntax-json-strings": "^7.8.0",											
	"@babel/plugin-syntax-nullish-coalescing-operator": "^7.8.0",
	"@babel/plugin-syntax-numeric-separator": "^7.8.0",
	"@babel/plugin-syntax-object-rest-spread": "^7.8.0",
	"@babel/plugin-syntax-optional-catch-binding": "^7.8.0",
	"@babel/plugin-syntax-optional-chaining": "^7.8.0",
	"@babel/plugin-syntax-top-level-await": "^7.8.3",

	"@babel/plugin-transform-arrow-functions": "^7.8.3",
	"@babel/plugin-transform-async-to-generator": "^7.8.3",
	"@babel/plugin-transform-block-scoped-functions": "^7.8.3",
	"@babel/plugin-transform-block-scoping": "^7.8.3",
	"@babel/plugin-transform-classes": "^7.9.0",
	"@babel/plugin-transform-computed-properties": "^7.8.3",
	"@babel/plugin-transform-destructuring": "^7.8.3",
	"@babel/plugin-transform-dotall-regex": "^7.8.3",
	"@babel/plugin-transform-duplicate-keys": "^7.8.3",
	"@babel/plugin-transform-exponentiation-operator": "^7.8.3",
	"@babel/plugin-transform-for-of": "^7.9.0",
	"@babel/plugin-transform-function-name": "^7.8.3",
	"@babel/plugin-transform-literals": "^7.8.3",
	"@babel/plugin-transform-member-expression-literals": "^7.8.3",
	"@babel/plugin-transform-modules-amd": "^7.9.0",
	"@babel/plugin-transform-modules-commonjs": "^7.9.0",								//module: 'cjs'
	"@babel/plugin-transform-modules-systemjs": "^7.9.0",
	"@babel/plugin-transform-modules-umd": "^7.9.0",
	"@babel/plugin-transform-named-capturing-groups-regex": "^7.8.3",
	"@babel/plugin-transform-new-target": "^7.8.3",
	"@babel/plugin-transform-object-super": "^7.8.3",
	"@babel/plugin-transform-parameters": "^7.8.7",
	"@babel/plugin-transform-property-literals": "^7.8.3",
	"@babel/plugin-transform-regenerator": "^7.8.7",
	"@babel/plugin-transform-reserved-words": "^7.8.3",
	"@babel/plugin-transform-shorthand-properties": "^7.8.3",
	"@babel/plugin-transform-spread": "^7.8.3",
	"@babel/plugin-transform-sticky-regex": "^7.8.3",
	"@babel/plugin-transform-template-literals": "^7.8.3",
	"@babel/plugin-transform-typeof-symbol": "^7.8.4",
	"@babel/plugin-transform-unicode-regex": "^7.8.3",
	"@babel/preset-modules": "^0.1.3",
	"@babel/types": "^7.9.0",
	"browserslist": "^4.9.1",