const num = 1;

/* let sleep = (ms=0)=>{
    return new Promise((resolve, reject) => setTimeout(resolve, ms));
}

async function test() {
    for (let i = 0; i < 10; i++) {
      await sleep(500);
      console.log(`i=${i}`);
    }
}
  
test().then(() => console.log('done')); */

var obj = {name: 123}
obj.sex = 'male';
Object.defineProperty(obj, 'key', {value: 'key'})

console.log(Object.getOwnPropertyDescriptor(obj, 'key'));