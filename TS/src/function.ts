//函数、可选参数、默认参数、剩余参数、函数重载、箭头函数
function person (name:string, age?:number):void {
  console.log(name, age)
}


function fn (name:string, ...rest:number[]):void {
  for(let i of rest) {
    console.log(i)
  }
}

fn('lov', 1, 2, 3)

//ts函数重载--先函数声明
function getInfo(name:string):string;
function getInfo(age:number):string;

function getInfo (s:any):string {
  if(typeof s === 'string'){
    return '名字' + s;
  }else{
    return '年龄' + s
  }
}
