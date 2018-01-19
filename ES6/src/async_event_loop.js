/* setTimeout(function(){                        //宏任务 macro task  --> script，setTimeout，setInterval
  console.log('定时器开始啦')
});

new Promise(function(resolve){                //event queue事件队列
  console.log('马上执行for循环啦');
  for(var i = 0; i < 10000; i++){
      i == 99 && resolve(i);
  }
}).then(function(i){                          //微任务  micro task -->Promise，process.nextTick
  console.log('执行then resolve函数:' + i)
});

console.log('同步代码执行结束'); */

/**
 * 下一次Event Loop(主线程读取：任务队列)之前触发callback函数
 * 多个process.nextTick语句, 全部在当前"执行栈"执行
 */
/* let process = require('process');
process.nextTick(_=>{               
  console.log(1);
  process.nextTick( _=>console.log(2))
})

setTimeout(()=>{
  console.log('timeout');
},0)

console.log("同步"); */

//多个setImmediate可能则需要多次loop才能执行完
//递归调用时，setImmediate指定的回调函数，总是排在setTimeout前面
/* setImmediate(_=>{
  setImmediate(_=>{               
    console.log(3);
    setImmediate( _=>console.log(4))
  })

  setTimeout(()=>{
    console.log('timeout2');
  },0)
}); */
/* setImmediate(_=>{               
  console.log(3);
  setImmediate( _=>console.log(4))
})

setTimeout(()=>{
  console.log('timeout2');
},0) */

/**
 * Async
 * async函数使用await后得语句会被放入一个回调函数,await后内容被放入微任务
 * 
 * 多个await嵌套 promise-then高于async
 * await后内容被放入微任务，后进先出
 */
async function async1() {
  console.log('async1 start -2 ');
  await async2();                  
  console.log('async1 end -10');     
}
async function async2() {
  console.log('async2 -3');
  await async3();   
  console.log('async2 end -9');   
}
async function async3() {
  await async4();
  console.log('async3 -7');
}
async function async4() {
  console.log('async3 -4');
}
console.log('script start -1');
setTimeout(function() {
    console.log('setTimeout -11');
}, 0);
async1();
new Promise(function(resolve) {
    console.log('promise1 -5');
    resolve();
  }).then(function() {
    console.log('promise-then -8');
  });
console.log('script end -6');