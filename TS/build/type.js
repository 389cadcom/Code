//基本数据类型 boolean, number, string, void 函数返回
//Boolean
var bool = false;
//Number
var num = 1;
//String
var str = "hi";
//复杂数据类型 [string, number], type[], enum
//Array
var arr0 = ['1', 2, 3];
var arr = [1, 2, 3];
var list = [1, 2, 3];
//Any
var anylist = [1, 'str', true];
//Enum
var Color;
(function (Color) {
    Color[Color["red"] = 0] = "red";
    Color[Color["green"] = 1] = "green";
    Color[Color["blue"] = 2] = "blue";
})(Color || (Color = {}));
//函数类型
let fn = (id) => 1; //ES6箭头函数
/**
 * 高级类型
 * 1.联合     number | string
 * 2.类型断言 foo as string             强制进行类型推导
 * 3.类型保护 tyoeof foo == 'string'    foo instanceof String
 */
//类 class   public, private, get, set, static
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    /* getAge():number{
      return this.age;
    } */
    static print() { }
}
let p = { name: 'linkFly', age: 1, }; //Object--解构
let p1 = new Person('jack', 30); //User
//泛型--接收任何类型并返回
function identity(arg) {
    return arg;
}
identity('link');
identity(0); //自动推导
