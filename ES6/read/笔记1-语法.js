//һ.let, const
1.�����ڱ�������		//undefined�� a is not defined
2.��������ʹ��
3.�����ظ����塢����

//��.�ַ���ģ��  ����ע��
let str = `${this.baseUrl}/query?${this.query}`


//��.��ͷ����
1.һ��������һ����䣺 let f = a => 'hello';
2.�޲�				   let f = ()=> 'hello';
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
