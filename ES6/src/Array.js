/*
 * @Author: Lonves 
 * @Date: 2017-11-08 14:17:48 
 * @Last Modified by: lonves.zheng
 * @Last Modified time: 2018-02-07 12:41:47
 * 
 * apply, call, bind, name, length, arguments, prototype
 */
var arr = [1,2,3,4];
var iter = arr[Symbol.iterator]();
iter.next()   //{value:1, done:false}
