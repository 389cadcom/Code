//2019-8 有条件对象属性
var sex = ''
var params = {
  name: 'lonve',
  age: 3,
  ... sex && {sex:sex}
}


//判断类型
Object.prototype.toString.call()
({}).toString.call(arr).match(/\s(\[a-zA-Z]+)/)	// 


//1.对象转为Map
new Map(Object.entries(obj))
fn = o => Object.keys(o).reduce((map, k) => map.set(k, o[k]), new Map())	//fn(obj)


//2.有条件的对象属性
var sex = '1'
var params = {
  name: 'lonve',
  age: 3,
  ... sex && {sex:sex}
}

//3.解构原始数据--提取两个部份, 用户及其他信息
const rawUser = {
 name: 'John',
 surname: 'Doe',
 email: 'john@doe.com',
 displayName: 'SuperCoolJohn',
 joined: '2016-05-05',
}

let user = {}, userDetails = {};
({ name: user.name, surname: user.surname, ...userDetails } = rawUser);