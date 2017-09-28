

/*4-28*/
export default 本质是输出一个叫做default的变量或方法，系统允许你取任意名字

/*
报错：							  正确：	
1.export default var a = 1;       var a = 1; export default a;

2.export 1;						  export default 1;

3.function f(){} 
export f;						  export {f}
*/

类：
export default class{}

import MyClass from './MyClass';
let o = new MyClass();


模块继承：

export * from './parent.js';

模块本质：
import时，不会执行模块，只是生成一个动态的只读引用，只有真需要时，才到模块去取值


//转码器
es6-module-transpiler

compile-modules convert file1.js file2.js -o output.js


class 

p[Symbol.iterator] is not a function



//http://blog.csdn.net/lihongxun945/article/details/48952017
7.Iterators + For of, Symbol

Generator +　yield + *

Promise => resolve reject then throw

代理Proxy



