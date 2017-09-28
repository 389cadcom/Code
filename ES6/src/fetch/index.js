/*
 * @Author: Lonves 
 * @Date: 2017-09-28 15:38:48 
 * @Last Modified by: lonves.zheng
 * @Last Modified time: 2017-09-28 17:05:56
 * 
 * 变量注入、对象属性动态属性名
 */

let dataCenter = {
    baseUrl: 'http://example.com/api/data',
    search(query){
        return fetch(`${this.baseUrl}/search?query=${query}`)
            .then(res => res.json())
            .then(rows => {
                //此处的 this 是 DataCenter，而不是 fetch 中的某个实例
                return fetch(`${this.baseUrl}/fetch?ids=${rows.join(',')}`)
            })
            .then( res => res.json() )
    }
};

let arr = [1,2,3];
let other = arr.map( n => {
    return {
        //n,
        [n] : n,
        [ `${n}^2` ]: Math.pow(n, 2)  
    }
})

var arr1 = [[1,2], [3,4]].map(([x, y])=>{
    return x + y;
})
console.log(arr1);

function move({x, y} = {x:0, y:0}){ console.log(x, y) }	

move()