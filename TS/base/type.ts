//Boolean
var bool:boolean = false;

//Number
var num:number = 1;

//String
var str:string = "hi";

//Array
var arr:number[] = [1,2,3];
var list:Array<number> = [1,2,3];

//Enum
enum Color {Red, Green, Blue}

//Any
var anylist:any[] = [1, 'str', true];

//void 函数返回

//类 class public, private, get, set, static

//泛型
function identity<T>(arg:T):T{
   return arg;
}
identity<string>('link');
identity(0)		//自动推导
