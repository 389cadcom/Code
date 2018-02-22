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


//next, return

var tasks = {
	actions: [],
	[Symbol.iterator]() {
        var steps = this.actions.slice();
        console.log(steps);
		return {
			next(...args) {
				if (steps.length > 0) {
                    //let fn = steps.shift();
					let res = steps.shift()( ...args );     //执行第一个任务函数
					return { value: res, done: false };
				} else {
					return { done: true }
				}
			},
			return(v) {
                steps.length = 0;
				return { value: v, done: true };
			}
		};
	}
};
/* tasks.actions.push(
	function step1(x){
		console.log( "step 1:", x );
		return x * 2;
	},
	function step2(x,y){
		console.log( "step 2:", x, y );
		return x + (y * 2);
	},
	function step3(x,y,z){
		console.log( "step 3:", x, y, z );
		return (x * y) + z;
	}
); */

var n = tasks[Symbol.iterator]();
for(var v in n){
    console.log(v);
}