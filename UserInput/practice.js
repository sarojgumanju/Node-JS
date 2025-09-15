const http = require("http");

const server = http.createServer((req, res) => {
  console.log(req.url, req.headers, req.method);
  if(req.url === '/home'){
    res.write('<h1>This is home page.</h1>');
    return res.end();
  }
  else if(req.url === '/contacts'){
    res.write('<h1>This is contact page.</h1>');
    return res.end();
  }
  else if(req.url === '/services'){
    res.write('<h1>This is service page.</h1>');
    return res.end();
  }
  else if(req.url === '/blogs'){
    res.write('<h1>This is blog page.</h1>');
    return res.end();
  }
  else if(req.url === '/documents'){
    res.write('<h1>This is document page.</h1>');
    return res.end();
  }

  res.write(`
<html lang="en">
<head>
    <title>Document</title>
</head>
<body>
    <head>
        <nav>
            <ul>
                <li><a href="/home">Home</a></li>
                <li><a href="/contacts">Contacts</a></li>
                <li><a href="/services">Services</a></li>
                <li><a href="/blogs">Blogs</a></li>
                <li><a href="documents">documents</a></li>
            </ul>
        </nav>
    </head>
    
</body>
</html>
    `);
    res.end();
});

server.listen(3002, () => {
  console.log("server running at address http://localhost:3002");
});
