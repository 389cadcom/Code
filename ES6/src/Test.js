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

var obj = {
    x: 1,
    y: 2,
    z: 3
}
console.log();

var set = new Set(Object.keys(obj));

var map = new Map([['name', 'li']])

var a = ['a']
map.set(a, 555);
console.log(map.get(a))



console.log(JSON.stringify(map))