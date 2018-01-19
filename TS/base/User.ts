export class User {
	readonly id: number
  private _name: string
  
	get name() {
		return this._name
  }
  set name(val){
    this._name = val;
  }
  constructor(id:number, name:string){
    // 只读属性只能在构造函数里初始化
    this.id = id;
    this.name = name;
  }
  say(){
    console.log(`name ${this._name}`);
  }
  static print(){
    console.log('static metch 断点需主文件添加断点才有效');
  }
}