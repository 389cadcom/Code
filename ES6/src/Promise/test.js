
let promise = new Promise(function(resolve, reject){
  if (false){
    setTimeout(()=> resolve('success'), 1000)
  } else {
    setTimeout(()=> reject('error'), 1000)
  }
})

promise
  .then((data) => {
    console.log({
      state: true,
      data: data,
      msg: 'operation successful'
    })
  })
  .catch((data) => {
    console.log({
      state: false,
      data: data,
      msg: 'operation failed'
    })
  })