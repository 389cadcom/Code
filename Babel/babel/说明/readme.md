# 使用第三方库问题 
   ## CommonJS类型不支持命名的导出, 可以通过解构方式使用默认的导出模块
   ## type='module' 无法使用require
   ## Node.js中使用import关键字(ES模块加载)程序强制使用完整目录路径

# hack: babel-plugin-add-module-exports

# Three Shaking --> 关闭babel模块转换 presets: [['@babel/preset-env', {modules: false}]] 
  ## 使用webpack来处理模块，在生产环境(production)删除没用的模块

# node v14支持ES6模块

1. type: "module | commonjs" 最近package.json顶级type字段为准
   a.默认package.json中type='commonjs'模式
   b.自定义es6模式, 若要定义commonjs模式文件需以.cjs结尾,
   c.第三方包commonjs使用为默认default导出


1. 用babel之类的工具把代码转换成commonjs的形式

2. commonjs在cli程序中使用，与前端浏览器完全无关，并且不通过api使用的情况

3. 为什么我用import { xxx } from "npm上的包"，以前require明明可以用，却结果告诉我没有导出xxx？

   因为npm上大多数都是commonjs包，而commonjs包的import语法是：

   import fsExtra from 'fs-extra';
   const { appendFile } = fsExtra


3. 我用了import Button from "antd/Button"，为啥说“Button not function”？

   因为你引入了的模块：
   由ESM语法通过babel等工具转换回到cjs
   使用了export default
   因此你需要使用：
   
   import Button from "antd/Button" 

<Button.default>Click Me</Button.default>


# 新包
1. 这个包可以通过这两种方式使用。require和import.
2. 该包在当前Node.js和缺乏ES模块支持的旧版本Node.js中都是可用的。
3. 包的主要入口点，例如'pkg'可供双方使用require解析为CommonJS文件，并通过import解析为ES模块文件。(导出路径也是如此，例如'pkg/feature'.)
4. 该包提供了命名的出口，例如。import { name } from 'pkg'而不是import pkg from 'pkg'; pkg.name.
5. 该包可能在其他ES模块环境(如浏览器)中使用。