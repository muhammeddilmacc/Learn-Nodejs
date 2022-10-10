const http = require('http');

const server = http.createServer((req,res)=>{
    
    //eğer html sayfası göderececeksek res.setHeader ile bunu bildirmemiz gerekir.

    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>Node js App</title></head>');
    res.write('<body><h1>Hello from node js</h1></body>');
    res.write('</html>');
    res.end();

});


server.listen(3000);