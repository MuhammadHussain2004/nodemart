const http= require('http');
const server = http.createServer((req,res)=>{

   if(req.url==='/'){
    res.end('Welcome to NoedMart');
   }

   else if(req.url==='/about'){
    res.setHeader('Content-Type','text/html');
    res.end('<h1>About NodeMart</h1><p>Learning raw node.js</p>');
   }

   else {
    res.statusCode=404;
    res.end('Page Not Found');
   }

});

server.listen(4000, ()=>{
    console.log('server is running at port 4000');
    
})


