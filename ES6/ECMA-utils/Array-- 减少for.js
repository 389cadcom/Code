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



//数据处理: 业务中处理数据结构--数组、对象JS方法
//1.筛选数组
  arr.filter( k => k)

//2.对象值筛选，属性排序，拼接请求参数&
	ary = Object.keys(params).filter( k => params[k]).sort().map(k => k + '=' + params[k])		//["a=A", "b=B", "d=D"]
	ary.join('&')
	arr.map( k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]) )


//3.查找数组中第一个符合条件，索引
	arr.find( item => item.id == 1 ).title
	arr.findIndex( item => item == 'a')


//4.修改对象中满足条件元素
  ary = arr.map( item => item.id == id ? {...item, title:'new title'} : item )		//新增属性覆盖原来同名属性


//5.统计数据、对象
	var arr= [{name:'yu', nums: 1}, {name:'cd', nums: 8}]
	arr.reduce((total, curr)=> total + curr.nums, 0)


//6.对象、数组添加新元素, 动态元素
	{...obj, sex:'male', ...o, [var1]: 'variable'}
	[...arr, 1, 2, ...ary]


//7.移除数数某一值
	ary = arr.splice(index, 1)
	ary = arr.filter( item => item.id != id )


//8.册除对象中某一属性
	user = {name:'yu', age:3, sex: 'male'}
	Object.keys(user)
		.filter( k => k !=='sex')
		.map( k => ({[k]: user[k]}) )
		.reduce((previous, current) => ({...previous, ...cuurent}), {})
	
	//参数解构
	function fn({name, age}){
		return {name, age}
	}
	fn(user)

//9.随机生成数组，长度、元素大小自定义
	Array.from({length: 10}, ()=> Math.floor(Math.random() * limit))

//10.多层数组平铺 -- 递归
  flatten = arr => {
		return arr.reduce( (flat, curr)=> flat.concat(Array.isArray(curr)? flatten(curr) : curr ), [])
	}

//11.二维数组转为对象 entries
	arr.reduce((flat, curr)=> ({...flat, [curr[0]]:curr[1]}), {})

	arr.reduce((flat, curr)=> {		//简写: (flat[curr[0]]=curr[1], flat)  
		flat[curr[0]]=curr[1]
		return flat
	}, {})


//12.包含
	arr.filter( item => {
		if(arys.includes(item)){		//arys.indexOf(item) > -1
			
		}
	})