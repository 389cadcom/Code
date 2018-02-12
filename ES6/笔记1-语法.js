//һ.let, const
1.�����ڱ�������		//undefined�� a is not defined
2.��������ʹ��
3.�����ظ����塢����

//������������Ƕ���ֻҪ�ö���ָ�����ڴ��еĵ�ַ�������ı䣬 ���ݿ������ĵ�(���漰��������Ĵ�ֵ�ʹ�ַ)

//��.�ַ���ģ��  ����ע��
let str = `${this.baseUrl}/query?${this.query}`


//��.��ͷ����
1.һ��������һ����䣺 let f = a => 'hello';
2.�޲�				   let f = ()=> 'hello';	// f = _=>{}  ʹ���»��ߴ���()
3.�������:
	let f = (a, b)=>{
		return a + b;
	}
4.�޷�ͨ��apply��call�ı�������(this)

5.����ʹ�ü�ͷ����������ָ��window��global


//��.�����������﷨
let obj = {
	
}
return {
	[n] : n,                             //��̬����������
	[ `${n}^2` ]: Math.pow(n, 2)        
}


//��.�⹹��ֵ	-- �����顢��������ȡֵ���Ա������и�ֵ

//����--��������
var [x, y] = [1,2];
var [a, ...b] = [1,2,3,4]

//����--���������û�д��򣬱�������������ͬ��
var {foo, bar}	 = {foo:'a', bar: 'b'};
var {foo: baz} = {foo:'a', bar: 'b'};		//foo error, baz 'a'	foo��ģʽ�����ᱻ�⹹��baz�Ǳ����Żᱻ��ֵ

//Ĭ��ֵ����������Ĭ�ϵ���undefined, ������(�⹹)�ĳ�Աֵ��ȫ����undefined�����н⹹��Ĭ��ֵ����Ч
var [a] = [];			//a === undefined
var [b = 1] = [];		//b === 1
var [c = 2] = [null];	//c == null

var {x}   = {};
var {y = 1} = {};
var {z = 2} = {z:null}

//�������ı������ڽ⹹��ֵ����Ӹ�С���ţ�JS����Ὣ{}�����ɴ����
let a;
{x} = {x:1}			//syntax error
({x} = {x:1})

//�������Խ⹹
var {min, max, log} = Math;


//���鱾����������󣬿��Զ�������ж������Խ⹹
var ary = [1, 2, 3, 4]
var {0:first, [ary.length-1]:last} = ary;

//�ַ�������ֵ������ֵ�⹹�������תΪ����

//���������⹹ -- ���ڶ�ά����
var arr = [ [1,2], [3,4] ];
ary = arr.map([x, y]=>{
	return x + y;
})


//��.��������
1.Ĭ��ֵ
function fn(x=1, y=2){		
	
}
//var x = arguments.length > 0 && arguments[0]!==undefined ? arguments[0] : 1;

//��Ͻ⹹��ֵʹ��
function fn({x=1, y=2}={}){

}
2.��������, ��������
//...args
var args = [].slice.apply(arguments)
var args1 = [].slice.apply(arguments, 1)

//�ϸ�ģʽ��arguments.callee, arguments.caller������


/*
  �������⣺
  1.�������������ܴ�������
  2.���������У�ģʽ���ܴ�������	//Ҳ���ڱ�������
  3.��ֵ����У�����ģʽ����ʹ��

  ��ֵ����е�ģʽ���ݣ�����ʹ�����š�

  var [(b)] = [3];				// ����
  [(b)] = [3];					//����  �ϸ�ģʽ�� bδ���屨��


  ���ã�
  1.�任������ֵ
  2.�Ӻ������ض��ֵ			//�������飬�����ٽ�帳ֵ
  3.���������Ķ���
  4.��ȡJSON����				//let {id, staus, data:number} = data;
  5.���庯��������Ĭ��ֵ
  6.for of����Map�ṹ	
  7.ģ���ָ������				//left {mth1, mth2} = require('mathod');
 */

//��.Object��չ					
1.������д��
2.���Ա���	
	�̳�����		//prototype
	����ö������	//Object.defineProperty		Object.getOwnPropertyNames(obj)
	Symbol����		//[Symbol()]				Object.getOwnPropertySymbol(obj)				
	��������		//							Object.keys()
3.������name����   //�أ�new Function() �� bind() ��������
4.Object.is		   // == �Զ�ת���������ͣ� === NaN, +0 -0
5.Object.assign    //�����enumerableΪfalse������
	��;��
	a.������������ԡ�����    Object.assign(this, {x, y})
	b.ǳ��¡����			  Object.assign({}, obj)		  //���¡������Lodash��_.defaultsDeep����
	c.�ϲ��������			  Object.assign({}, obj)	//��ͬ���Իᱻ����
	d.ָ��Ĭ��ֵ			  let options = Object.assign({}, DEFAULTS, options);

//es7
6.Object.values
7.Object.entries	//��;������תΪ������Map�ṹ  -->ES5��չentries  Generator | for of
8. Rest�⹹��ֵ		//let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 };


/*
1.for...in
for...inѭ��������������ĺͼ̳еĿ�ö�����ԣ�����Symbol���ԣ���

2.Object.keys(obj)
Object.keys����һ�����飬������������ģ������̳еģ����п�ö�����ԣ�����Symbol���ԣ���

3.Object.getOwnPropertyNames(obj)
Object.getOwnPropertyNames����һ�����飬��������������������ԣ�����Symbol���ԣ����ǰ�������ö�����ԣ���

4.Object.getOwnPropertySymbols(obj)
Object.getOwnPropertySymbols����һ�����飬�����������������Symbol���ԡ�

5.Reflect.ownKeys(obj)
Reflect.ownKeys����һ�����飬��������������������ԣ���������������Symbol���ַ�����Ҳ�����Ƿ��ö�١�

for...in +  Reflect.ownKeys��������(->�̳в���ö������??)
1.�̳����ԣ�
2.��������
3.Symbol����
4.����öö������

TODO���ϲ�ȥ�ء�����
*/	

//Class����				
1.Object.create�����ĵڶ���������ӵĶ������ԣ�����p�����������ʽ������Ĭ���ǲ��ɱ�����
2.class��ԭ�͵ķ������ǲ���ö�ٵ�

Object.getOwnPropertyDescriptor(class {foo() {}}.prototype, 'foo').enumerable

//ES6 classԭ��
Object.getOwnPropertyNames(Man.prototype)		//man ʵ�������ȡthis.x����


//�ˡ�����Function
1.call, apply, bind								//���ú�����ִ��ԭ������ bind�����Ѿ��󶨺�this�ĺ���, ������ִ��
	a.����α���		[].slice.call(obj), [].slice.bind(obj)()
	b.�̳�				person.call(this, name)
	c.ȡ���Сֵ		Math.min.apply(this, arr)
	d.�ϲ�����			[].push.apply(arr1, arr2);