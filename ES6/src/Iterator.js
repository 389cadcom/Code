//Iterator
var students = {};
students[Symbol.iterator] = function(){
	let i = 0;
	return {
		next(){
			return {value: i++, done: i>10}
		}
	}
}

var makeIterator = function(arr){
    let index = 0;
    return {
        next(){
           return  index < arr.length ?
                {value: arr[index++]}:
                {done: true}
        }
    }
}
var it = makeIterator(['a', 'b', 'c']);
for(let i=0; i<4; i++){
    //console.log(it.next());
}
var arr = ['red', 'blue', 'yellow'];
console.dir(arr.keys())

for (let pair of arr.keys()) {
console.log(pair);
}