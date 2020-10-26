
//按需引用ant-design-vue icon
module.exports = {
  configureWebpack: {
    plugins: [new IgnorePlugin(/^\.\/locale$/, /moment$/)],
    resolve: {
      alias: {
        '@ant-design/icons/lib/dist$': resolve('./src/antd/icons.js'),
      },
    },
  },
}

//icon.js
export { default as StarOutline } from '@ant-design/icons/lib/outline/StarOutline'