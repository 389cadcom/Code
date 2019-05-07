tsc src/test.ts -m commonjs  --outDir dist  //�ֶ��������
tsc                                         //����tsconfig.json, �༭��ǰĿ¼�µ������ļ�

tsc --init            //����tsconfig.json


//1. ��������--
boolean, number, string, undefined, null, void, symbol, iterator, Proxy, Reflect  

//2.��������
[string, number], number[], Array<any>, Promise<object>  //Ԫ�顢���鷺��

any,  Object

//���Ͷ���
(<string>str).length, (str as string).length

(<TypeClass1>.type).fn1

//�ж�
typeof,  f instanceof string

function fn<T extends ILength>(arg:string):string{
	console.log(arg.length)
	return arg;
}

//���ͱ���
function padLeft(val: string, pad: string | number){
	if(typeof pad == 'string'){
		return pad + val
	}
	if(typeof pad == number){
		return Array(pad + 1).join(' ') + val
	}
}


//3.�߼�����
object | null														//����

let fn:(id:string) => number = function(id:string):number{ return parseInt(id) }
//(id:string) => number   �������� (��������������, ����ֵ����) --Ϊÿ������ָ��һ�����ֺ�����

let addFunc = (x:number, y:number):number => x + y;

let addFunc: (x: number, y:number) => number = function(x: number, y: number): number { return x + y }

//�ƶ�����--�����ƶ�
let addFunc: (x: number, y:number) => number = function(x, y): number { return x + y }

//�����Ƶ�--Ĭ���и�ֵ��ts�����Զ��Ƶ������ͣ�������������
//���ݷ�����䣬�Զ��Ƶ�����ֵ������



Ĭ�ϲ�������ѡ����			 //��ѡ����������ڱ����������
												 //Ĭ�ϲ���ҲӦ�ű��������, ����ʱ������
ʣ�����	 function(x:number, ...args:string[]):string{}

//����this  ˭����ָ��˭-- ���˵���, setTimeout, setInterval ==> window | global

onClick, => ָ��ǰ����


//4.����--�������ӿڡ���
function fn<T>(str:T):T{
	return str
}

function identify<T extends IGen>(str:T):T{}

function fetch<T>(url: string): Promise<T> { }

//�ӿ�
interface IGen{
	length:number
}
let gen:IGen = fn

let gen:<T>(arg:T)=>T = fn
let gen:<T as IGen> = fn

gen:{<T>(arg:T):T}    = fn
