interface IPerson {
  firstName: string,
  lastName?: string,       //可选项
  sex: 'man' | 'woman'     //默认值选项
}

class Human {
  firstName: string;
  sex: string;
  constructor(name:string, sex: string){
    this.firstName = name;
    this.sex = sex;
  }
  say(){
    console.log('I`am:' + this.sex)
  }
}

var man = new Human('lu', 'man');
man.say()

//ajax
const ajax = function (url: string, params?:any):Promise<object>{
  return fetch(url, params).then( response => response.json() )
}

//fn
let fn:(id:string) => number = (id) => 1;

var fn1 = (...args:any[]) => (val:any) => args.map( item => item + val)

var f = fn1('a', 'b', 'c')('A')

//model
let user1: object = {id:1, name:'Lu'}

console.log(user1);