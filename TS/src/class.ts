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