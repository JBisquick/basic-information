const http = require('node:http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  let filePath = '.' + req.url + '.html'

  if (req.url === '/') {
    fs.readFile('./index.html' , function(err, data) {
      if (err) {
        res.writeHead(404, {'Content-Type': 'text/html'});
        return res.end("404 Not Found");
      }
    
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write(data);
      return res.end();
    })
  }

  fs.readFile(filePath , function(err, data) {
    if (err) {
      fs.readFile('404.html', function(err, data) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data);
        return res.end();
      });
      return;
    }
  
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(data);
    return res.end();
  })
});

server.listen(8080);