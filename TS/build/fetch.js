"use strict";
//ES6
/* export const fetch = function(url, params, User){
  return http(params).then(data=>{
    return data;
  }).catch(err =>{
    return err;
  })
} */
Object.defineProperty(exports, "__esModule", { value: true });
//TS
exports.ajax = function (url, params, user) {
    //code
    return;
};
let http;
function fetch(url) {
    return http(url).then(data => {
        return data; //强制进行类型推导
    });
}
