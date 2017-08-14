/* 'use strict';

//export 输出变量，还可以输出方法或类

export default functon(){}							//默认导出
export function each(obj, iterator, context){}		//带定义标识导出

export {each as forEach};							//重命名导出
export {MY_CONST, myFunc};							//自已列出导出内容

export * from 'src/other_module';					//继承导出
export {foo, bar} from 'src/other_module';
export {foo as myFoo, bar} from 'src/other_module';

export default count;
export {count};

//导入
import _, {each} from 'underscore';					//逗号分割默认导出和命名导出
import {name1, name2} from 'src/lib';				//单一逐指定导入
import {name1 as myName1, name2} from 'src/lib';	//定义别外
import * as libs from 'src/lib';					//整体导入
import 'src/lib';									//只导入不使用


//TODO default导出对象
export default {
  someMethod
}
function someMethod() {
  // ...
}
// app.js
import Module from './module'

Module.someMethod()


export default {
	method1,
	method2
}

import M from './method'
M.method1 */