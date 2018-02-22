
// var process = require('process');

console.log(1);


process.nextTick(()=>{
    console.log('process1');
    process.nextTick(()=>console.log('process2'));
})

//多个setImmediate需多次loop才能执行完，嵌套的需等下次loop执行
setImmediate(function (){
  setImmediate(function A() {
    console.log(1);
    setImmediate(function B(){console.log(2);});
  });

  setTimeout(function timeout() {
    console.log('TIMEOUT FIRED');
  }, 0);
});