//JSON.string(obj, null, 2) 格式化缩进

//1.异步、解构、Promise
var [user, account] = await Promise.all([
	fetch('/user'),
	fetch('/account')
])

//2.扩展运算符
Math.max(...arr);

o = {...obj}		//对象扩展运算

//3.函数参数解构命名
function f({id, name, force})