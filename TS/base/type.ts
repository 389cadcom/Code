//基本数据类型 boolean, number, string, void 函数返回
//Boolean
var bool:boolean = false;
//Number
var num:number = 1;
//String
var str:string = "hi";


//复杂数据类型 [string, number], type[], enum
//Array
var arr0:[string, number, number] = ['1',2,3]
var arr:number[] = [1,2,3];
var list:Array<number> = [1,2,3];

//Any
var anylist:any[] = [1, 'str', true];

//Enum
enum Color {red, green, blue}

//函数类型
let fn: (id: string) => number = (id) => 1      //ES6箭头函数

/**
 * 高级类型
 * 1.联合     number | string
 * 2.类型断言 foo as string             强制进行类型推导
 * 3.类型保护 tyoeof foo == 'string'    foo instanceof String
 */


//类 class   public, private, get, set, static
class Person {
  name:string;
  age: number;
  constructor(name:string, age:number){
    this.name = name;
    this.age  = age;
  }
  /* getAge():number{
    return this.age;
  } */

  static print(){ }
}

let p: Person = {name: 'linkFly', age: 1,  }      //Object--解构
let p1:Person = new Person('jack', 30);           //User

//泛型--接收任何类型并返回
function identity<T>(arg:T):T{
   return arg;
}
identity<string>('link');
identity(0)		                //自动推导
