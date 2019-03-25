//String, Number��Boolean���䡢װ�� --> JS�������������ֻ����������ͣ��Զ�Ϊ�乹������ new String('abc')


//TODO �������ض���ʱ--ԭ�͡����캯��״��

//���캯����ԭ�͡�����  --> Person, Person.prototype, p
1.Person��prototype��Ա			      -> Person.prototype
2.Person.prototype��constructor		  -> Person
3.p.__proto__    -> Person.prototype;
  p.constructor  -> Person

//Child.prototype = new Parent();			//ԭ�ͼ̳� Child.prototype.constructor === Parent
//Child.prototype.constructor = Child;		//���ù��캯��
Child = Object.create(Parent.prototype, {
	constructor: {
		value: Child,
		configurable:true,							//�������ܷ�ɾ�����߸ı�����ֵ
		enumerable: true,								//�������ܷ�ö��
		writable: true									//�������ܷ����¸�ֵ
	}
})

1.child.__proto__ = Child.prototype
2.child.__proto__.__proto__ = Child.prototype.__proto__ = Parent.prototype
3.child.__proto__.__proto__.__proto__ = Parent.prototype.__proto__ = Object.prototype
  

//ԭ�Ͷ���� constructor ԭ����ָ�������������Person, ��Person.prototypeָ��һ��ȫ�µĶ���constructor ��ָ���� Object
Person.prototype = {		
	constructor: Person				
}		

function f(){}
//JS����Ĭ��ִ�����������
f.prototypep = Object.create(Object.prototype, {
	constructor: {
		value: f,
		configurable: true,
		enumerable: true,
		writable: true
	}
})


var obj = {_msg:'1'};
//2.Object.defineProperty
Object.defineProperty(obj, 'msg', {				//��������Ĭ��Ϊfalse
	get: function(newVal, oldVal){
		return this._msg;
	},
	set: function(newVal, oldVal){
		this._msg = newVal;
	}
})
var txt = document.getElementById("txt");		//˫���
txt.value = obj.msg;
txt.onchange = function(){
	obj.msg = this.value;
}

//API
Object.defineProperty
Object.defineProperties
Object.getOwnPropertyDescriptor
Object.getOwnPropertyNames
Object.getOwnPropertySymbols

Object.create
Object.assign					//��Դ����source�������п�ö�����ԣ�
								//���Ƶ�Ŀ�����target��, ��ϼ̳�-- Object.assign(base.prototype, ...mixins); function(...mixins){  }
Object.keys
Object.values
Object.entries

Object.setPrototypeOf				
Object.getPrototypeOf			//�����������ϻ�ȡ����

Object.isExtensible				//'use strict'����
Object.isFrozen
Object.isSealed
Object.preventExtensions		//����չ, �ɲ�������޸�
Object.seal						//�ܷ� ������չ������ɾ�������޸� -- ��Ա����configurable����Ϊfalse
Object.freeze					//���ᣬ����ɾ���������޸ģ�������չ -- ������㶳��
								//���Բ�����ָ���κ�����������߳��л����������͵�ֵ��������ָ��Ķ����Ǹ���ͨ�Ķ��󣬻����Զ�д������


//ʵ������,
obj.hasOwnProperty				//��ʵ�����������Ƿ���и����� 
obj.propertyIsEnumerable		//��⵽����������(�������̳е�����)�������ǿ�ö����Ϊ true
obj.isPrototypeOf
obj.valueOf						//���ش˶���Ļ����������͵�ֵ
obj.toString

obj1.hasOwnProperty === obj2.hasOwnProperty

Object.prototype.hasOwnProperty('hasOwnProperty')
String.prototype.hasOwnProperty('substr')


//����Ƿ���ԭ�ͷ���
function isPrototypeVal(obj, key){
	return key in obj && !obj.hasOwnProperty(key);
}


//Reflect
Reflect.set(target, key, value, receiver);
Reflect.get(target, key, receiver);
Reflect.ownKeys(obj)


//��Ա����
//Object.getOwnPropertyDescriptor(obj, 'property')
/**
 desc  == {value: "A", writable: false, enumerable: false, configurable: false}
 desc1 == { get:function(){}, set:function(){}, enumerable: false, configurable: false}

 Object.keys()ֻ������������г�Ա��for...in�Ѷ���̳г�ԱҲ��ȡ�ˣ�ֻҪ�˳�Ա��[[Enumerable]]Ϊtrue����obj.hasOwnProperty()ʹ��
*/

1.value��				�˳�Ա��ֵ�������ǻ����������ͻ��Ƕ��󡢺�����ȱʡΪundefined
2.enumerable��			ȱʡΪtrue����ʶ�˳�Ա�Ƿ���Ա�ö��
3.configurable��		ȱʡΪtrue����ʶ�˳�Ա�������Ƿ���Ա��޸�
4.writable��			ȱʡΪtrue����ʶ�˳�Ա�Ƿ���Ա������µ�ֵ(�ڷ� strict ģʽ�²��ܶ��丳ֵ)
//ע��value��writable��������ֻ�� data property ���У�accessor property û�С�������Ϊ accessor property ��ֵ���Ƿ��д���������� getter �� setter 


//1.{} ES3�������Կ�ö�٣�ԭ����Object.prototype, descĬ��Ϊtrue

//2.Object.create(proto, {}), ԭ���ǵ�һ������(obj.__proto���ԣ�descΪtrue)�� descĬ��Ϊfalse

//3.Object.defineProperty(obj, 'a', desc)��ԭ��ΪObject.prototype, descĬ��Ϊfalse

//4.class���������캯��������, descĬ��Ϊtrue, �������巽��descΪfalse --> ES6�涨ԭ�͵ķ������ǲ���ö�ٵ�
Object.getOwnPropertyDescriptor(class { foo() {} }.prototype, 'foo').enumerable;

//5.Object.assign, ��չ���Ի򷽷���descĬ��Ϊtrue  
Object.assign(Object.prototype, {})


//ע�⣺Prototype��������obj.__proto__��ʹ��Object.getOwnPropertyDescriptor(obj.__proto__, 'b')


//��¡һ�����󣬰����̳�����
function clone(origin) {
    let originProto = Object.getPrototypeOf(origin);
    return Object.assing(Object.create(originProto), origin);
}


car2 = Object.create({year:2017})	//ԭ�ͼ̳У�����ö�٣����ɱ���


//Eg:
//'use strict'
var obj = {
	int: 0
};
	
obj.int = 10;
console.log(obj.int);				// 10
console.log(Object.getOwnPropertyDescriptor(obj, 'int')); 	// ES5���壬�������Զ���true
console.log(obj.propertyIsEnumerable("int"));				// true �����������ǿ�ö��

Object.defineProperty(obj, "int", {	// ��� property descriptor ������������
	enumerable: false,
  	writable: false,
	configurable: true				//Ĭ��Ϊtrue, ��Ա�Ƿ�����ò�����deleteɾ��
});
console.log(obj.propertyIsEnumerable("int"));		// false

obj.int = 20;						// TypeError �� strict ģʽ�±���
console.log(obj.int);				// �ڷ� strict ģʽ�¸�ֵʧ�ܣ�����û�г���

/*Object.defineProperty(myNum, "int", {
	configurable: false
});	*/								// ������û�л�ͷ����--����configurable��, (enumerable,writable)������false��Ϊtrue

Object.defineProperty(obj, "int", {
	writable: true
});			
obj.int = 20;
console.log(obj.int);			//20


//���캯����ԭ��
new.target �жϹ��������ĵ��÷���
function Person(){
	if(!new.target)
		throw new TypeError("Constructor Person requires 'new'")
}
//���캯���ж����new
function Person(name){
	if(this instanceof Person){
		this.name = name;
	}else{
		return new Person(name)
	}
}



//�Զ������˽�б�����ʽ
//1.IIFE��ִ�к���
var obj = (function(){
	//private
	return {				//���صĽ������
		//public
	}
}())

//2.���캯�����ض����Ա		-->  ����������������������û�й���һ�������Ĵ洢
function Person(name, birthYear){
	var currentYear = 2018;
	function older(){
		currentyear++;
	}

	return {
		name: name,
		older: older,
		get age(){
			return currentYear - birthYear;
		}
	}
}
var p  = new Person('jack', 1987);
var p1 = Person('jack', 1987);
p1.older();										//����ִ��˽�б���

//3.�����ʽ--IIFE + ���캯��
var Person = (function(){
	var currentYear = 2018;								// ��̬����Ա������ʵ�������������ڲ�����

	function _Person(name, birthYear){
		this.name = name;

		Object.defineProperty(this, 'birthYear', {		// ֻ����Ա
			//value: birthYear,
			get: function(){
				return birthYear;
			},
			enumerable: true
		})
	}
	_Person.odler = function(){							// ����ĵľ�̬����
		return currentYear++;
	}

	_Person.prototype.getAge = function(){				// ԭ�ͷ���
		return currentYear - this.birthYear;
	}
	return _Person;
}())



//Mixins
//ǳ����--ֻ�������󲻴��ڵ����ԣ�ֻ����ԭ�ж������¼���һ��ָ��
function mixin(target, source){								
	for(var prop in source){
		if(source.hasOwnProperty(prop) && !(prop in target)){
			target[prop] = source[prop];
		}
	}
	return target;
}
