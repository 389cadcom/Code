//类、对象、静态方法、承继
class Human {
  name:string;
  constructor(name:string) {
    this.name = name;
  }
  say(){
    console.log(this.name)
  }
}

class Robot extends Human {
  birthday:string = '2018-9-10'
  static Age:number = 20;
  protected sex:number = 1;
  run(){
    console.log('this is run method' + Robot.Age)
  }
  static hi():void{
    console.log('say Hi')
  }
}

var r:Robot = new Robot('robot')


/**
关于类中成员访问修饰符:
ts类中成员(成员属性、成员方法)的访问修饰符，类似于java中类成员的访问修饰符，不同的是ts中默认是被public修饰。
public :公有           在当前类里面、 子类  、类外面都可以访问
protected：保护类型     在当前类里面、子类里面可以访问 ，在类外部没法访问
private ：私有         在当前类里面可以访问，子类、类外部都没法访问
 
属性如果不加修饰符 默认就是公有(public)
 */


 /**
* ts中抽象类、继承、多态、接口、实现继承 -- 抽象类必须含有抽象方法
* 抽象类: abstract 修饰， 里面可以没有抽象方法。
* 但有抽象方法(abstract method)的类必须声明为抽象类(abstract class)
* 多态:父类定义一个方法不去实现，让继承它的子类去实现  每一个子类有不同的表现
* 注意：使用多态基础是类的继承或者接口实现
 */
abstract class Animate {
  name:string;
  constructor(name:string) {
    this.name = name;
  }
  abstract eat():void;
  say(){

  }
}

class Cat extends Animate {
  eat(): void {
    console.log('猫吃鱼')
  }
}
var cat:Cat = new Cat('cat')
cat.eat()