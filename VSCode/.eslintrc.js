/**
  1.如果eslint是全局，则插件也必需全局安装 html -- npm i eslint-plugin-html -g 
  2.plugins: ['vue'] -- eslint-plugin-html eslint-plugin-vue

  在根目录的.eslintignore中添加：*.vue，就会忽略所有vue后缀的检查了

  "off"或者0		//忽略，关闭规则关闭
  "warn"或者1		//在打开的规则作为警告（不影响退出代码）
  "error"或者2		//把规则作为一个错误（退出代码触发时为1）
*/
//插件，此插件用于识别文件中的js代码，没有MIME类型标识没有script标签也可以识别到，如识别.vue文件中的js代码
/* eslint-disable */

module.exports = {
    parser: 'babel-eslint',//解析器，这里我们使用babel-eslint
    env: {
        browser: true,
        node: true,
        commonjs: true,
        es6: true
    },
    extends: 'eslint:recommended',
    parserOptions: {
        sourceType: 'module',
        parser: 'babel-eslint'
    },
    plugins: ['vue'],		
    rules: {
		'indent': 0								// 忽略indent
        indent: ['error', 2],
		'no-mixed-spaces-and-tabs': [2, true],	//同时使用tab space
        'linebreak-style': ['error', 'unix'],
		"no-unused-vars": [2, { 
		  // 允许声明未使用变量
		  "vars": "local",
		  // 参数不检查
		  "args": "none" 
		}],
        quotes: ['error', 'single'],
        semi: ['error', 'never']
    },
    /* globals: {
        __dirname: true
    } */
}

