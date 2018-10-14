//1.连等操作 -- 从右向左赋值
var a = b = 10;   //a局部变量, b全局变量  var a = (b = 10)

a = {n:1}					//对象值的引用
b = a
a.x = a = {n:2}
a.x = ?, b.x = ?


//2.原型
Object.prototype.a = 1
Function.protype.a = 2

function fn(){}
var f = new fn();

fn.a == ?, f.a = ?