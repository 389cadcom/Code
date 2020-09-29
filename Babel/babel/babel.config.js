module.exports = {
  presets: [
    ['@babel/preset-env'],
    '@babel/preset-react',
  ],
  plugins: [
    // ['import', { libraryName: 'vant', libraryDirectory: 'es', style: true }, 'vant'],
    ['import', { libraryName: 'antd', libraryDirectory: 'lib', style: true }, 'antd'],
    
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    // 让系统支持可选链
    '@babel/plugin-proposal-optional-chaining',
  ],
};
