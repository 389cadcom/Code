//1.
let some = <ISome>{}

let count = <Count>function(start: number){
	
}

初始定义变量，如有赋值ts可以自动推导类型，不需指明类型

//2.类的修饰符
来自同一处声明, 认为这两个类型是兼容
private, protected  //受保护属性，只能在类或子类中使用

构造函数被标记成 protected。 类不能在包含它的类外被实例化，但是能被继承

readonly只能在初始化或构造函数中赋值

参数属性
constructor(private name:string){}


只带get不带有 set的存取器自动被推断为 readonly

//抽象类, 抽象方法 abstract    抽象类可以包含成员实现的方法

//联合数组类型：(Rhino | Elephant | Snake)[]  Animal[]
var x = [new Rhino(), new Elephant(), new Snake()];


//12.25泛型
Array<T>       //类型“String”不是泛型类型   String<T>出错

interface ILength{
	length:number
}
function<T extends ILength>(arg:T):T{

}

//TODO
interface Generics<T> {
    data: T;
}
let g1: Generics<number> = <Generics<number>>{};


//12.28 类型兼容性
ts结构类型系统来描述这些类型比传统名义类型系统更好，

如：不需要去实现接口内容，只需要检查目标类型成员属性、类型相一致就可以赋值
interface IName{
	name:string
}
class Person{
	name:string = 'lonve'
}

let p:IName = new Person()


let x:IName
let y = {name:'lonve', age:3}
x = y

//两个变量是否能赋值：检查属性是够齐全，不能缺少

let x = {name: 'lonve', age:3}
let y = {name: 'yufeng'}

x = y			//Error
y = x			//Yes


//函数的参数是否能传参：检查属性是否太多，缺省参数。
let x = (a: number) => 0;
let y = (b: number, s: string) => 0;

y = x; // OK
x = y; // Error


//不同的枚举之间不兼容


//类有静态属性、实例属性、构造函数
比较两个类的类型的对象时，只有实例的成员会被比较


//高级类型
交叉类型和联合类型

类型保护与区分类型

可Null的类型

字符串字面量类型

多态的this类型

索引类型

映射类型