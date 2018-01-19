export const fetch = function(url, params, User){
  //code
  return http(params).then(data=>{
    return data;
  }).catch(err =>{
    return err;
  })
}

export const fetch = function(url:string, params?:any, user:User):Promise<object>{
  //code

 }