var http = require('http');
var fs = require('fs');

var server = http.createServer((req, res)=>{
  if(req.url == '/favicon.ico') return false;
  var href;
  if(req.url == '/'){
    href = 'index.html';
  }else{
    href = req.url;
  }
  fs.readFile(href, 'utf-8', (err, data)=>{
    if(err){
      console.log('can not find page' + href);
      return;
    }
    res.writeHead(200, {'content-type':'text/html'});
    res.end(data);
  })
})
server.listen(80, ()=>{
  console.log('Server listening on: http://localhost:%s', 80)
})