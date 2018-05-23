//babel-polyfill的引用和使用

1.require("babel-polyfill");

2.import "babel-polyfill";

3.module.exports = {

　　entry: ["babel-polyfill", "./app/js"]

};

注：第三种方法适用于使用webpack构建的同学，加入到webpack配置文件(webpack.config.js)entry项中