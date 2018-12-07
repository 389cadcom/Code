/**
	1.Array.includes   --> Array.indexOf
	2.Array.find       --> Array.filter   findIndex(
	3.Array.some			 --> Array.find
	4.Array.reduce		 --> Array.filter + Array.map			
	
	给数组对象添加新属性
	arys.reduce((acc, curr)=> curr.bool ? acc.concat({...curr, age:2}): acc, [])
*/


//1.跳出for循环,    forEach遍历数组的时候是无法 break 中断的
var arr = [1,2,3]		
arr.foo = 'foo'
for(let i of arr){   //for...in   obj.hasOwnProperty 排除原型方法 i, arr[i]
	if(i==2) break;
}

//遍历
1.for...in遍历对象本身所有属性--自身+原型, 优先用于纯对象遍历 break

2.for...of 遍历数组、伪数组，如果不需要索引优先用 break;

3.forEach((item, i)=>{}), 需使用索引值使用，但不能中断遍历  return false; 跳出当前条件



//数据处理: 业务中处理数据结构--数组、对象JS方法
//1.筛选数组
  arr.filter( k => k)

//2.对象值筛选，属性排序，拼接请求参数&
	ary = Object.keys(params).filter( k => params[k]).sort().map(k => k + '=' + params[k])		//["a=A", "b=B", "d=D"]
	ary.join('&')
	arr.map( k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]) )								//转义

	//params-- reduce处理
	Object.keys(params).sort().reduce((list, curr)=>{
		if(params[curr]){
			list.push(curr + '=' + params[curr])
		}
		return list;
	}, []).join('&')

//3.查找数组中第一个符合条件，索引
	arr.find( item => item.id == 1 ).title
	arr.findIndex( item => item == 'a')


//4.修改对象中满足条件元素
  ary = arr.map( item => item.id == id ? {...item, title:'new title'} : item )							//新增属性覆盖原来同名属性Object.assgin()


//5.统计数组对象某一属性值 | accumulator, currentValue
	var arr= [{name:'yu', nums: 1}, {name:'cd', nums: 8}]
	arr.reduce((total, curr)=> total + curr.nums, 0)


//6.对象、数组添加新元素, 动态元素----新增属性覆盖原来同名属性
	{...obj, sex:'male', ...o, [var1]: 'variable'}
	[...arr, 1, 2, ...ary]


//7.移除数数某一值
	ary = arr.splice(index, 1)
	ary = arr.filter( item => item.id != id )


//8.册除对象中某一属性
	user = {name:'yu', age:3, sex: 'male'}
	Object.keys(user)																									//过滤
		.filter( k => k !=='sex')
		.map( k => ({[k]: user[k]}) )																		//映射返回数组对象
		.reduce((previous, current) => ({...previous, ...curent}), {})	//平铺、展开
	
	delete user.sex
	
	//参数解构
	function fn({name, age}){
		return {name, age}
	}
	fn(user)

//9.随机生成数组，长度、元素大小自定义 TODO无重复？？
	Array.from({length: 10}, ()=> Math.floor(Math.random() * limit) )

//10.多层数组平铺 -- 递归
var flatten = arr => {
		return arr.reduce( (flat, curr)=> flat.concat(Array.isArray(curr)? flatten(curr) : curr ), [])
	}


//11.二维键值对数组转为对象
	arr.reduce((flat, curr)=> ({...flat, [curr[0]]:curr[1]}), {})

	arr.reduce((flat, curr)=> {		//简写: (flat[curr[0]]=curr[1], flat)  
		flat[curr[0]]=curr[1]
		return flat
	}, {})

	arr.reduce()


//12.包含--过滤在另一个数组存在的项
	arr.filter( item => {
		if(arys.includes(item)){		//arys.indexOf(item) > -1
			
		}
	})