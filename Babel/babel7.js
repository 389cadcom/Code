@babel/core @babel/cli 
@babel/polyfill
@babel/transform-runtime	 @babel/plugin-transform-runtime

//@babel/plugin-transform-arrow-functions
@babel/preset-env					 
@babel/preset-react
@babel/preset-flow
@babel/preset-typescript



//Брвы
babel src --out-dir lib --presets=@babel/env


//Р§:
{
	test: /\.(js|es|es6|jsx)$/,
	use: [
		{
			loader: 'babel-loader',
			options: {
				 presets: [
					 ['es2015', {modules: false, loose: true}],
					 ['react'],
					 ['stage-2']
				 ],
				 plugins: [
					 ['transform-runtime']
				 ],
				 comments: false,
				 cacheDirectory: true
			}
		},
		{
			loader: 'eslint-loader',
			options: {
				configFile: eslintConfigPath
			}
		}
	],
}