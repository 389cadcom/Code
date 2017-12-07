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
    console.log(it.next());
}


//Iterator
class RangeIterator {
    constructor(start, end){
        this.value = start;
        this.end = end;
    }
    [Symbol.iterator](){
        return this;
    }
    next(){
        return this.value < this.end?
            {value:this.value++} : { done: true }
    }
}

let obj = {
    data: ['Hello', 'World', "Hi"],
    /* [Symbol.iterator](){
        let index = this.i, self = this;
        return {
            next(){
                return index < self.data.length ?
                    { value: self.data[index++] } : { done:true }
            }
        }
    }, */
    * [Symbol.iterator](){
        let i = 0, len = this.data.length;
        while(i < len){
            console.log(this.index++)
            yield this.data[i];
            i++;
        }
        /* for(let key of this.data){
            console.log(i)
            yield key;
        } */
    }
}
for(let v of obj){
    console.log(v);
}