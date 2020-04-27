/**
	1.Array.includes   --> Array.indexOf
	2.Array.find       --> Array.filter   findIndex(
	3.Array.some			 --> Array.find
	4.Array.reduce		 --> Array.filter + Array.map			
	
	������������������
	arys.reduce((acc, curr)=> curr.bool ? acc.concat({...curr, age:2}): acc, [])
*/


//1.����forѭ��,    forEach���������ʱ�����޷� break �жϵ�, ������return;������ǰֵ, throw Error('��ֹ')
var arr = [1,2,3]		
arr.foo = 'foo'
for(let i of arr){   //for...in   obj.hasOwnProperty �ų�ԭ�ͷ��� i, arr[i]
	if(i==2) break;
}

//����
0.for	 i, arr[i] ��ȡ��������ǰֵ ���� break, continue;

1.for...in������������������--����+ԭ��, �������ڴ��������  ���� break

2.for...of �������顢α���飬�������Ҫ����������		���� break;

3.forEach((item, i)=>{}), ��ʹ������ֵʹ�ã���������(break, continue);   return false; ������ǰ����


//���˿յĲ���ֵ
const trimParams = (params) => {
  var arr = Object.keys(params).filter(key => params[key].toString())
  var data = arr.reduce((prev, curr)=>{
    return {...prev, [curr]: params[curr]}
  }, {})
  return data
}

//��ȡ�������ֵ
var arr = [{name:'a'},{name:'b'},{name:'c'},]
Array.from(arr, ({name})=> name)		// ['a', 'b', 'c']


//���ݴ���: ҵ���д������ݽṹ--���顢����JS����
//1.ɸѡ����
  arr.filter( k => k)

//2.����ֵɸѡ����������ƴ���������&
	ary = Object.keys(params).filter( k => params[k]).sort().map(k => k + '=' + params[k])		//["a=A", "b=B", "d=D"]
	ary.join('&')
	arr.map( k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]) )								//ת��

	//params-- reduce����
	Object.keys(params).sort().reduce((list, curr)=>{
		if(params[curr]){
			list.push(curr + '=' + params[curr])
		}
		return list;
	}, []).join('&')

//3.���������е�һ����������������
	arr.find( item => item.id == 1 ).title
	arr.findIndex( item => item == 'a')


//4.�޸Ķ�������������Ԫ��
  ary = arr.map( item => item.id == id ? {...item, title:'new title'} : item )							//�������Ը���ԭ��ͬ������Object.assgin()


//5.ͳ���������ĳһ����ֵ | accumulator, currentValue
	var arr= [{name:'yu', nums: 1}, {name:'cd', nums: 8}]
	arr.reduce((total, curr)=> total + curr.nums, 0)

	obj = arr.reduce((prev, curr)=> {...prev, [curr]:''}, {})			// ����ת����, ��ά����--> Object.fromEntries()


//6.�������������Ԫ��, ��̬Ԫ��----�������Ը���ԭ��ͬ������
	{...obj, sex:'male', ...o, [var1]: 'variable'}
	[...arr, 1, 2, ...ary]


//7.�Ƴ�����ĳһֵ
	ary = arr.splice(index, 1)
	ary = arr.filter( item => item.id != id )


//8.���������ĳһ����
	user = {name:'yu', age:3, sex: 'male'}
	Object.keys(user)																									//����
		.filter( k => k !=='sex')
		.map( k => ({[k]: user[k]}) )																		//ӳ�䷵���������
		.reduce((previous, current) => ({...previous, ...curent}), {})	//ƽ�̡�չ��
	
	delete user.sex
	
	//�����⹹
	function fn({name, age}){
		return {name, age}
	}
	fn(user)

//9.����������飬���ȡ�Ԫ�ش�С�Զ��� TODO���ظ�����
	Array.from({length: 10}, ()=> Math.floor(Math.random() * limit) )

//10.�������ƽ�� -- �ݹ�
var flatten = arr => {
		return arr.reduce( (flat, curr)=> flat.concat(Array.isArray(curr)? flatten(curr) : curr ), [])
	}
//����ת����
var obj = arr.reduce((prev, curr)=> {...prev, [curr]:''}, {})


//11.��ά��ֵ������תΪ����
	arr.reduce((flat, curr)=> ({...flat, [curr[0]]:curr[1]}), {})

	arr.reduce((flat, curr)=> {		//��д: (flat[curr[0]]=curr[1], flat)  
		flat[curr[0]]=curr[1]
		return flat
	}, {})

	arr.reduce()
//12.������ÿ��Ԫ�س��ֵĴ���
var arr = ['a1', 'a3', 'a1', 'a5',  'a7', 'a1', 'a3', 'a4', 'a2', 'a1'];
arr.reduce((accum, curr)=>{
	if(accum[curr]){
		accum[curr]++
	}else{
		accum[curr] = 1	
	}
	return accum;
}, {})

//ȥ��
arr.reduce((accum, curr)=>{
	if(!accum.includes(curr)){
		accum.push(curr)
	}
	return accum;
}, [])


//13.����--��������һ��������ڵ���
	arr.filter( item => {
		if(arys.includes(item)){		//arys.indexOf(item) > -1
			
		}
	})


//14.����--������������
function arrToGroup(results){
	var map = {}, arr = [];
	for(var item of results){
		if(!map[item.id]){
			arr.push({
				id: item.id,
				datas: [item]
			})
			map[item.id] = item
		}else{
			for(var list of arr){
				if(list.id == item.id){
					list.datas.push(item);
					break;
				}
			}		
		}
	}
	arr.sort((a, b)=>{
		return a.name.charCodeAt() - b.name.charCodeAt()
	})
	return arr;
}