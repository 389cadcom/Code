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

//2
interface Ifactory {
  name:string;
  birthday:string;
  run():void;
}

class Factory implements Ifactory {
  name: string;  
  birthday: string;

  run(): void {
    console.log('factory running')
  }
}

var f:Ifactory = new Factory()
f.run()