tsc src/test.ts -m commonjs  --outDir dist  //手动添加命令
tsc                                         //配置tsconfig.json, 编辑当前目录下的所有文件

tsc --init            //生成tsconfig.json


//1. 基础类型--
boolean, number, string, undefined, null, void, symbol, iterator, Proxy, Reflect  

//2.复杂类型
[string, number], number[], Array<any>, Promise<object>  //元组、数组泛型

any,  Object

//类型断言
(<string>str).length, (str as string).length

(<TypeClass1>.type).fn1

//判断
typeof,  f instanceof string

function fn<T extends ILength>(arg:string):string{
	console.log(arg.length)
	return arg;
}

//类型保护
function padLeft(val: string, pad: string | number){
	if(typeof pad == 'string'){
		return pad + val
	}
	if(typeof pad == number){
		return Array(pad + 1).join(' ') + val
	}
}


//3.高级类型
object | null														//联合

let fn:(id:string) => number = function(id:string):number{ return parseInt(id) }
//(id:string) => number   函数类型 (包含：参数类型, 返回值类型) --为每个参数指定一个名字和类型

let addFunc = (x:number, y:number):number => x + y;

let addFunc: (x: number, y:number) => number = function(x: number, y: number): number { return x + y }

//推断类型--上下推断
let addFunc: (x: number, y:number) => number = function(x, y): number { return x + y }

//类型推导--默认有赋值的ts可以自动推导出类型，不用声明类型
//根据返回语句，自动推导返回值的类型



默认参数、可选参数			 //可选参数必需放在必需参数后面
												 //默认参数也应放必需参数后, 调用时可略缩
剩余参数	 function(x:number, ...args:string[]):string{}

//函数this  谁调用指向谁-- 无人调用, setTimeout, setInterval ==> window | global

onClick, => 指向当前对象


//4.泛型--函数、接口、类
function fn<T>(str:T):T{
	return str
}

function identify<T extends IGen>(str:T):T{}

function fetch<T>(url: string): Promise<T> { }

//接口
interface IGen{
	length:number
}
let gen:IGen = fn

let gen:<T>(arg:T)=>T = fn
let gen:<T as IGen> = fn

gen:{<T>(arg:T):T}    = fn
