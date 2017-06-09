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

let set = new Set(arr);
// console.log(set)
set = new Set([...set].map(item => item * 2));
// console.log(set)


var map = new Map([
    [1, 'Li'],
    [2, 'Wu'],
    [3, 'Zhang'],
    [{ a: 'A' }, 'ABC']
])

for (let [key, val] of map.entries()) {
    console.log(key, val)
}

let map0 = new Map([[1,'a'],[2,'b'],[3,'c']])


map0 = new Map(
  [...map].filter(([k, v]) => k < 3)
);

map.forEach(function(value, key, map) {
  console.log("Key: %s, Value: %s", key, value);
});