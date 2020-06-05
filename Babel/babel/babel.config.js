module.exports = {
  presets: [
    [
      '@babel/preset-env',
      { loose: true, useBuiltIns: 'usage', targets: { browsers: ['last 2 versions', 'ie >= 7'] } }
    ]
  ],
  plugins: [
    ["@babel/plugin-proposal-decorators", { "legacy": true }],
    ["@babel/plugin-proposal-class-properties", {loose: true}]
  ]
}
