let eslint = [
  'eslint:recommended',
  'standard',
  'plugin:prettier/recommended',

  'plugin:react/recommended',
  'plugin:vue/essential',
  'plugin:@typescript-eslint/eslint-recommended',
]

//config
// "eslint-config-airbnb"        --要求有分号
// "eslint-config-standard"
// "eslint-plugin-prettier"      配置 eslint 使用 prettier 对代码进行格式化
// "eslint-config-prettier"      关闭一些不必要的或者是与 prettier 冲突的 lint 选项。

/*
plugins:@

@typescript-eslint/eslint-plugin
eslint-plugin-babel
eslint-plugin-flowtype
eslint-plugin-react
eslint-plugin-standard
eslint-plugin-unicorn
eslint-plugin-vue
*/

/*
"@vue/prettier"
@vue/airbnb
@vue/standard
*/

/*
npm i --save-dev prettier eslint-plugin-prettier eslint-config-prettier prettier-eslint-cli

eslint-plugin-prettier  配合eslint使用prettier,
eslint-config-prettier  禁用一些eslint和prettier冲突的规则，
prettier-eslint-cli     使我们可以敲命令格式化代码

error: Delete ⏎ (prettier/prettier) at src/pages/xxx
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
