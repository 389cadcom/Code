//2019-8 ��������������
var sex = ''
var params = {
  name: 'lonve',
  age: 3,
  ... sex && {sex:sex}
}


//�ж�����
Object.prototype.toString.call()
({}).toString.call(arr).match(/\s(\[a-zA-Z]+)/)	// 


//1.����תΪMap
new Map(Object.entries(obj))
fn = o => Object.keys(o).reduce((map, k) => map.set(k, o[k]), new Map())	//fn(obj)


//2.�������Ķ�������
var sex = '1'
var params = {
  name: 'lonve',
  age: 3,
  ... sex && {sex:sex}
}

//3.�⹹ԭʼ����--��ȡ��������, �û���������Ϣ
const rawUser = {
 name: 'John',
 surname: 'Doe',
 email: 'john@doe.com',
 displayName: 'SuperCoolJohn',
 joined: '2016-05-05',
}

let user = {}, userDetails = {};
({ name: user.name, surname: user.surname, ...userDetails } = rawUser);