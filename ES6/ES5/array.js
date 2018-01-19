forEach, every, some, filter, map,		//(item, i, arr)	return Ìø³öÑ­»·
reduce, reduceRight						//(prev, next, i, arr), current

$.each((i, val))

var arr = [1,2,3,4,5];

var ary = arr.filter((item, i)=>{
    return item > 2;
})
var ary1 = arr.map((item, i)=>{
    return item * 2;
})

var ary2 = arr.every((item, i, array)=>{
    return item > 0
})

var total = arr.reduceRight((v1, v2)=>{
    console.log(v1, v2)
    return v1- v2;
})
console.log(total);
