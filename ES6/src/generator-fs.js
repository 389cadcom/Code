const fs = require('fs');

var readFile = function(url){                 //内部执行第二次next()
  console.log('读取文件')
  fs.readFile(url, 'utf-8', (err, data)=>{
    if(err){
      console.log(err);
      g.throw('read err');
    }else{
      g.next(data);                 
    }
  })
}
var writeFile = function(url, data){
  console.log('写入文件')
  fs.writeFile(url, data, err=>{
    if(err){
      g.throw('write err');
      return console.log(err);
    }
    g.next('写入成功');
  })
}

var gen = function* (){
  var txt = yield readFile('./src/class.js');
  console.log(txt);
  yield writeFile('./gen.txt', txt);
}
var g = gen();
g.next();     
// g.next("自定义内容!");            //第二次next(), readFile执行，没有使用返回内容

// console.log();

//闭包、函数柯里化
function readIIFE(url) {
  return callback => {
    fs.readFile(url, 'utf-8', (err, str) => {
      if (err) throw err;
      callback(str);
    });
  };
}

readIIFE('gen.txt')(str => {
  console.log(str);
});
