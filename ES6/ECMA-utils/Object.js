/**
ԭ����: 
	 Function.prototype.__proto__ === Object.prototype
	 Person.prototype.__proto__   === Object.prototype

��ʽԭ��:
	 Function.__proto__						=== Function.prototype
	 Object.__proto__							=== Function.prototype
	 Person.__proto__						  === Function.prototype

���캯��__proto__ָ����ԭ��(�����ù��캯��)
	 Person.__proto__ === Function.prototype


1. Person.prototype.conctructor == Person == p.constructor
2. p.__proto__ === Person.prototype


Object.getOwnPropertyDescriptors(Person.prototype) //����ԭ���ϵ����ԡ�����

Object.getOwnPropertyDescriptors(Person)					 //Function�ϵ����ԡ����� name, prototype, length, __proto__

Object.getOwnPropertyDescriptors(p)								 //constructor��ʵ��������


//��ö�ٵ�����--enumerable, 
Object.keys(t), Object.keys(Person.prototype)			//ES6����ķ������ǲ���ö�ٵ�

Person.prototype.log = function(){}								//ES5����Ŀ�ö��


class A {
  static NUM = 3.14;								//��̬����
  prop = 'props'										//ʵ������
  constructor(name){
    this.name = name								//���캯��ʵ������
  }
  print(){													//ԭ�ͷ���--����ö��
   
  }
}
*/


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