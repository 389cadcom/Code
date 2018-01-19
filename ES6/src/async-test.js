/*
 * @Author: lonves 
 * @Date: 2018-01-16 10:15:10 
 * async函数返回一个 Promise 对象，可以使用then方法添加回调函数。
 * async函数await后得语句会被放入一个回调函数，内容会被放入微任务
 * try...catch结构捕获异步操作失败，也不要中断后面的异步操作
 */

function sleep(ms=0){
    return new Promise((resolve, reject)=>{
        setTimeout(resolve, ms);
    });
}

async function test(){
    for(let i =0; i<10; i++){
        await sleep(1000).then(()=>console.log("resolve"));           
        console.log(i);
    }
}
test()
console.log(123)

