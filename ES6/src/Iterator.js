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
    let nextIndex = 0;
    return {
        next(){
           return  nextIndex < arr.length ?
                {value: arr[nextIndex++]}:
                {done: true}
        }
    }
}
var it = makeIterator(['a', 'b', 'c']);
for(let i=0; i<5; i++){
    console.log(it.next());
}

var arr = ['a', 'b', 'c'];
var iter = arr[Symbol.iterator]();

console.log(iter.next());
