export default class User {
	readonly id: number                 // 只读属性
  private _name: string               // 存取器, get/set
  
	get name() {
		return this._name
  }
  set name(val){
    this._name = val;
  }

  constructor(id:number, name:string){
    this.id = id;                   // 只读属性只能在构造函数里初始化
    this.name = name;
  }

  say():void{                            //实例方法
    console.log(`name ${this._name}`);
  }
  static print():void{                   //静态方法
    console.log('static metch 断点需主文件添加断点才有效');
  }
}


let jack:User = new User(1, 'jack');
console.log(jack instanceof User);

console.log(jack.name, jack.id); //jack._name
jack.say()