const http = require("http");
const fs = require('fs');
const { buffer } = require("stream/consumers");

const server = http.createServer((req, res) => {
  const method = req.method;

  if (req.url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>form page</title></head>");
    res.write(
      '<body><form action="/message" method="POST"><input type="text" name="msg"><button>send</button></form></body>'
    );
    res.write("</html>");
    return res.end();
  }

  if (req.url === "/message" && method === 'POST') {
    const body = [];
    req.on('data', (chunk)=>{
        body.push(chunk);
    });

    req.on('end', ()=>{
        const parsedBody = Buffer.concat(body).toString();
        const message = parsedBody.split('=')[1];
        fs.appendFileSync('message.txt', `${message}\n`);
    });

    res.statusCode = 302;
    res.setHeader('Location', '/');
    return res.end();
  }

  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>Node js App</title></head>");
  res.write("<body><h1>Hello from node js</h1></body>");
  res.write("</html>");
  res.end();
});

server.listen(3000);
