function f(a, b=1){
    console.log(arguments.length)   // 实参
}
console.log(f.length)               // 形参，去除有默认值参数

f()