

/*4-28*/
export default ���������һ������default�ı����򷽷���ϵͳ������ȡ��������

/*
����							  ��ȷ��	
1.export default var a = 1;       var a = 1; export default a;

2.export 1;						  export default 1;

3.function f(){} 
export f;						  export {f}
*/

�ࣺ
export default class{}

import MyClass from './MyClass';
let o = new MyClass();


ģ��̳У�

export * from './parent.js';

ģ�鱾�ʣ�
importʱ������ִ��ģ�飬ֻ������һ����̬��ֻ�����ã�ֻ������Ҫʱ���ŵ�ģ��ȥȡֵ

//REPL: babel-node
Modules aren't supported in the REPL

//��ȷ:
babel-node module.js


//ת����
es6-module-transpiler

compile-modules convert file1.js file2.js -o output.js


class 

p[Symbol.iterator] is not a function

/*2017-2-14*/
1.��ͷ����������Ĭ�ϱ�������չ�����

2.class��

3.����������д�������ʽ����������

4.�ַ���ģ�� ${var}

5.�⹹��ֵ

6.Set WeakSet, Map WeakMap

//http://blog.csdn.net/lihongxun945/article/details/48952017
7.Iterators + For of, Symbol

Generator +��yield + *

Promise => resolve reject then throw

����Proxy



/*11.10*/
1.babel
  babel example.js -o compiled.js
  babel src -d dist
  babel src -d dist  -s

  babel-cli
  babel-node
  babel-register
  babel-core
  babel-polyfill

  babel-presets-es-2015
  babel-presets-stage-2015

  npm run build			//scripts: {build: ''}

 2.����������
   �����ڱ�������		//undefined�� a is not defined
   ��������ʹ��
   �����ظ����塢����

 3.�����Ľ⹹��ֵ
	
  �����顢��������ȡֵ���Ա������и�ֵ
  ���飺 ��������
  1.1.ģʽƥ��			//let [a, ...b] = [1,2,3,4]
  1.2.����ȫ�⹹
  
  ���� �����������û�д��򣬱�������������ͬ��
  var {foo, bar}	 = {foo:'a', bar: 'b'};
  var {foo: baz} = {foo:'a', bar: 'b'};		//foo error, baz 'a'
  //foo��ģʽ�����ᱻ�⹹��baz�Ǳ����Żᱻ��ֵ

  let foo;
  let {foo} = {foo: 1}		//���� let,const�����ض���
  //({foo} = {foo:1})

  Ĭ��ֵ--���������ֵ����undefined
  var {x = 3} = {};
  var {x, y = 5} = {x:1};

  var {x=2} = {x:null}

  �������ı������ڽ⹹��ֵ����Ӹ�С���ţ���JS����Ὣ{}�����ɴ����
  var x;
  {x} = {x: 1}; //syntax error
  ({x} = {x:1});

  //�������Խ⹹
  let {log, sin, max} = Math;
  //���鱾����������󣬿��Զ�������ж������Խ⹹
  let arr = [1,2,3]
  let {0: first, [arr.length-1]: last} = arr;

  �ַ���   //��������

  ��ֵ������ֵ�⹹�������תΪ����

  ���������⹹
  var arr = [[1,2], [3,4]].map(([a, b])=>{
	return a + b;  
  });

  //Ĭ��ֵ
  function move({x=0,y=0} = {}){ }		   //����ָ��Ĭ��ֵ
  move({})		//undefined��������������Ĭ��ֵ

  function move({x, y} = {x:0, y:0}){ }	   //����ָ��Ĭ��ֵ
  move({})		//[undefined, undefined]

  �������⣺
  1.�������������ܴ�������
  2.���������У�ģʽ���ܴ�������	//Ҳ���ڱ�������
  3.��ֵ����У�����ģʽ����ʹ��

  ��ֵ����е�ģʽ���ݣ�����ʹ�����š�

  var [(b)] = [3];		// ����
  [(b)] = [3];			//����  �ϸ�ģʽ�� bδ���屨��


  ���ã�
  1.�任������ֵ
  2.�Ӻ������ض��ֵ   //�������飬�����ٽ�帳ֵ
  3.���������Ķ���
  4.��ȡJSON����	   //let {id, staus, data:number} = data;
  5.���庯��������Ĭ��ֵ
  6.for of����Map�ṹ
  7.ģ���ָ������		//left {mth1, mth2} = require('mathod');

/*11-28*/
1.��������Ĭ��ֵ
  arguments.length > 0 && arguments[0]!==undefined?arguments[0]:1;
2.���츳ֵ���ʹ��
  function f1({x=0, y=0} = {}){		//����Ĭ���ǿն��󣬵��⹹��ֵ��Ĭ��ֵ
  
  }


