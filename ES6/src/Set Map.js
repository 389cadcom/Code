//自定义Interator接口
let Symb = {
    [Symbol.iterator]() {
        let pre = 0,
            cur = 1;
        return {
            next() {
                [pre, cur] = [cur, pre + cur];
                return { done: false, value: cur }
            }
        }
    }
}
for (var n of Symb) {
    // truncate the sequence at 1000
    if (n > 10) break;

}


var arr = [1, 2, 3, 2, 4, 5]
var arr1 = [1,3,6,7];

let set = new Set(arr);
let set1 = new Set(arr1);
let temp = new Set([...set].filter(x=>!set1.has(x)));
console.log(new Set([...temp, ...set1]))

//new Set([...set1].map(val=>val*2))
let set2 = new Set(Array.from(set1, val=>val*2));

console.log(set2)

var map = new Map([
    [1, 'Li'],
    [2, 'Wu'],
    [3, 'Zhang'],
])

for (let [key, val] of map) {
    console.log(key, val)
}

let map0 = new Map([[1,'a'],[2,'b'],[3,'c']])


map0 = new Map(
  [...map].filter(([k, v]) => k < 3)
);

var obj = {};
map.forEach((key, val)=>{
    obj[key] = val;
})
var json = JSON.stringify(obj);

console.log(json)
