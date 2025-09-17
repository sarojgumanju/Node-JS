const sumRequestHandler = require("./sum");

const requestHandler = (req, res) => {
  console.log(req.url, req.method);
  if (req.url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write(`
        <html>
            <head><title>Calculator</title></head>
            <body>
                <h1>Welcome to MY CALCULATOR.</h1>
                <a href="/calculator">Go to Calculator</a>
            </body>
        </html>
    `);
    return res.end();
  }

  else if(req.url.toLowerCase() === "/calculator"){
    res.setHeader("Content-Type", "text/html");
    res.write(`
        <html>
            <head><title>Calculator</title></head>
            <body>
                <h1>CALCULATOR</h1>
                <form action="calculate-result" method="POST">
                    <input type="text" placeholder="Enter first number" name="first"/>
                    <input type="text" placeholder="Enter second number" name="second"/>
                    <button type="submit" value="Submit">Add</button>
                </form>
            </body>
        </html>
    `);
    return res.end();
  }

  else if(req.url.toLowerCase() === "/calculate-result" && req.method == 'POST'){
     return sumRequestHandler(req, res);
     
  }

  res.setHeader("Content-Type", "text/html");
    res.write(`
        <html>
            <head><title>Calculator</title></head>
            <body>
                <h1>404 page doesnot exist</h1>
                <a href="/">Go to Home</a>
            </body>
        </html>
    `);
    return res.end();
};

module.exports = requestHandler;
