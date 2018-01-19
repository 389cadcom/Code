//对象定义迭代器
let iter = {
  index: 0,
  [Symbol.iterator](){return this},
  next(){
    this.index++;
    if (this.index<5) {
      return {value:this.index, done:false}
    }else{
      return {done:true}
    }
  }
}
for(let v, res; (res=iter.next()) && !res.done;){
  v = res.value;
  //console.log(v);
}

//斐波列表
let Fib = {
  [Symbol.iterator](){
    let prev = 1, next = 2;
    return {
      next(){
        [prev, next] = [next, prev+next];
        return {value: next, done:false};
      },
      return(v){        //TODO 外面传入值return()
        console.log("Fib list");
        return {value: v, done:true};
      }
    }
  }
}
//iter = Fib[Symbol.iterator]()
for (const i of Fib) {
  console.log(i);
  if(i > 20) break;
}