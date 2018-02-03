//ES6
/* export const fetch = function(url, params, User){
  return http(params).then(data=>{
    return data;
  }).catch(err =>{
    return err;
  })
} */

import User from './User';
//TS
export const ajax = function(url:string | object, params?:any, user?:User):Promise<object>{
  //code
  return ;
 }

let http;
 function fetch<T>(url:string):Promise<T>{
  return http(url).then(data=>{
    return data as T;                         //强制进行类型推导
  })
 }