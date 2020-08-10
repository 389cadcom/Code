module.exports = {
  plugins: [
    ["@babel/plugin-proposal-decorators", { "legacy": true }],
    ["@babel/plugin-proposal-class-properties", { loose: true }],
		// 让系统支持可选链
    '@babel/plugin-proposal-optional-chaining',
  ]
}
