//1.跳出for循环,    forEach遍历数组的时候是无法 break 或者 return false 中断的
var arr = [1,2,3]
arr.foo = 'foo'
for(let i of arr){   //for...in   obj.hasOwnProperty 排除原型方法 i, arr[i]
	if(i==2) break;
}

//注：
1.for...in遍历对象本身所有属性--自身+原型, 优先用于纯对象遍历

2.for...of 遍历数组、伪数组，如果不需要索引优先用

3.forEach((item, i)=>{}), 需使用索引值使用，但不能中断遍历