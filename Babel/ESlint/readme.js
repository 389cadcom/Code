//结合Prettier和ESLint来规范代码 -- plugin:prettier/recommended
let eslint = [
  'eslint:recommended',
  'standard',
  'plugin:prettier/recommended',

  'plugin:react/recommended',
  'plugin:vue/essential',
  'plugin:@typescript-eslint/eslint-recommended',

  ['plugin:@typescript-eslint/recommended', 'eslint:recommended', 'prettier'],
  //规范冲突时，后面的会覆盖掉前面
]
//npx create-prettier-eslint 创建配置

/*config
  "@vue/prettier"
  @vue/airbnb
  @vue/standard

  'airbnb',                     --要求有分号
  "eslint-plugin-prettier"      配置 eslint 使用 prettier 对代码进行格式化
  "eslint-config-prettier"      关闭一些不必要的或者是与 prettier 冲突的 lint 选项。
  "prettier-eslint-cli"     使我们可以敲命令格式化代码

npm i --save-dev prettier eslint-plugin-prettier eslint-config-prettier prettier-eslint-cli

TS:
yarn add typescript @typescript-eslint/parser @typescript-eslint/eslint-plugin -D

plugins:
  @typescript-eslint/eslint-plugin
  eslint-plugin-babel
  eslint-plugin-flowtype
  eslint-plugin-react
  eslint-plugin-standard
  eslint-plugin-unicorn
  eslint-plugin-vue

  eslint-plugin-html


//webpack-dev 开发环境预检测错误
babel-eslint  eslint-loader
{
  enforce: 'pre',
  test: /\.(vue|jsx?)$/,
  loader: 'eslint-loader',
  exclude: /node_module/,
  options: {
    formatter: require('eslint-friendly-formatter')
  }
}

Error: Delete ⏎ (prettier/prettier) at src/pages/xxx
prettier配置和编辑器prettier配置冲突导致的   在rules中配置下覆盖掉就可以了
"prettier/prettier": [
  "error",
  {
    "singleQuote": true,
    "trailingComma": "none",
    "bracketSpacing": true,
    "jsxBracketSameLine": true
  }
]
*/
