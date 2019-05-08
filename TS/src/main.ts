interface IPerson {
  firstName: string,
  lastName?: string,       //可选项
  sex: 'man' | 'woman'     //默认值选项
}

class Man {
  firstName: string;
  sex: string;
  constructor(name: string, sex: string) {
    this.firstName = name;
    this.sex = sex;
  }
  say() {
    console.log('I`am:' + this.sex)
  }
}

var man = new Man('lu', 'man');
man.say()


//Ajax异步
const ajax = function (url: string, params?:any):Promise<object>{
  return fetch(url, params).then( response => response.json() )
}


//fn
let handler: (id: string) => number = (id) => 1;

var fn1 = (...args: any[]) => (val: any) => args.map(item => item + val)
