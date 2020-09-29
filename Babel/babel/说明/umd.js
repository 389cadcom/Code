/*
  libraryTarget: 'umd'
  
  libraryName: 'vant'
  libraryDiectory: 'es',
  style: true
*/

(function(root, factory) {
  if(typeof exports === 'object' && typeof module === 'object'){
    module.exports = factory()
  }
  else if(typeof define === 'function' && define.amd){
    define([], factory)
  }
  else if(typeof exports === 'object'){
    exports["cjs-library"] = factory();
  }
  else {
    exports['lib'] = factory()
  }
})(root, function(){
  //code
});