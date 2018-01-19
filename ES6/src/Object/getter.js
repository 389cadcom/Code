/*
 * @Author: lonves 
 * @Date: 2018-01-15 16:18:21 
 * @Last Modified by: lonves.zheng
 * @Last Modified time: 2018-01-16 11:08:48
 * 
 * Object.defineProperty
 * 1.data descripto5r
 * 2.accessor descriptor
 */
var obj = {_msg:'1'};
Object.defineProperty(obj, 'msg', {
  configurable: true,
  enumerable: false,
  // writable: false,
  get: function(newVal, oldVal){
    return this._msg;
  },
  set: function(newVal, oldVal){
    this._msg = newVal;
  }
})
Object.defineProperty(obj, 'val', {
  enumerable: true,
  value: 1
})
Object.defineProperties(obj, {
  'key': {
    value: 'key'
  },
  'del': {
    value: 'del'
  }
})

for (const key in obj) {
  if (obj.hasOwnProperty(key)) {
    const elem = obj[key];
    console.log(key, elem)
  }
}
console.log(Object.isExtensible(obj));

