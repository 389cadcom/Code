/*
 ------------------------------�µ����ݽṹ---------------------------------
 Set, Map, WeakSet, WeakMap
 Symbol, Iterator, Generator, Promise, Proxy, Reflect
 Class, Module
*/

//һ.�����ݽṹSet, Map
1.Set		//ֵ����Ψһ,֧����ʽ����, ����һ������(������)��Ϊ��������ʼ��--����ȥ��
  constructor, size
  add, delete, has, clear
  keys, foreach
  
  [...set]		//��չ�����

  Set�ڲ�����NaN�����
  �����������ǲ����

  �ж��Ƿ����һ�������棺obj[key]     set.has(key)
  
  Array.from()��Set�ṹתΪ����
  Array.from(set, val=>val*2)		   //TODO

  ������ new Set([...set1, ...set2])
  ����:  new Set([...set1].filter(val=>set2.has(val)))
  �:	 [...set1].filter(val=>!set2.has(val))

  WeakSet:
  add, delete, has
  û��size���ԣ�û����������Ա


2.Map			//��ֵ�Զ�������Ϊ����   new Map([['name','Li'], [{a:'A'}, 'ABC']])
  size, 
  set(key, val), get(key), has(key), delete(key), clear

  ͬһ����θ�ֵ�����渲��ǰ��ֵ
  ��ȡһ��δ֪�ļ�������undefined
  
  //�������ã�������ͬһֵ����ʵ���ڴ��ַ�ǲ�һ����
  map.set(['a'], 555);			//��Ϊ��let a = ['a']
  map.get(['a'])				// undefined


  �������ݽṹת����
  1.��ά����    [...map]			new Map(arrs)
  2.����	    obj[key] = val;     map.set(key, obj[key])   //�������ַ���  for(let [key, val] of map)
  3.JSON
	 ���������ַ���, ��תΪ����   ->   JSON.stringify(obj)		
	 �����з��ַ���, תΪ����JSON ->   JSON.stringify([...map]) 


//����Symbol, Iterator

//6-29
�� -> �﷨��ģ��

writable, configurable, enumerable



//06-26 ����Iterator�ӿ�
1.�⹹��ֵ		--> �������Set���н⹹��ֵ

2.��չ�����  ...set

3.yield*

for...inѭ�������������ּ�������������ֶ���ӵ�����������������ԭ�����ϵļ�

for...of
Array.from()


//06-9
0.Iterator 
  keys, values, entries

1.Set	


2.Map	//���������Ϊ����   new Map([['name','Li'], [{a:'A'}, 'ABC']])
  size, set(key, val), get(key), has(key), delete(key), clear

  ͬһ����θ�ֵ�����渲��ǰ��ֵ
  ��ȡһ��δ֪�ļ�������undefined
  
  //�������ã�������ͬһֵ����ʵ���ڴ��ַ�ǲ�һ����
  //��Ϊ��let a = ['a']
  map.set(['a'], 555);
  map.get(['a']) // undefined

  �������ݽṹת����
  1.��ά����    [...map]			new Map(arrs)
  2.����	    obj[key] = val;     map.set(key, obj[key])
  3.JSON
	 ���������ַ���, ��תΪ����   ->   JSON.stringify(obj)		
	 �����з��ַ���, תΪ����JSON ->   JSON.stringify([...map]) 