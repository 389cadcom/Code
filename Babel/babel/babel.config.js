module.exports = {
  presets: [
    ['@babel/preset-env', {modules: false}],
    '@babel/preset-react',
  ],
  plugins: [
    // ['import', { libraryName: 'lodash', libraryDirectory: '', 'camel2DashComponentName': false }],
    ['import', { libraryName: 'antd', libraryDirectory: 'lib', style: true }, 'antd'],
    // ['import', { libraryName: 'vant', libraryDirectory: 'es', style: true }, 'vant'],
    
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    '@babel/plugin-proposal-optional-chaining',
  ],
}
