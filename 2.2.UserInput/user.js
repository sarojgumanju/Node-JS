const http = require("http");
const fs = require('fs');

const server = http.createServer((req, res) => {
    console.log(req.url, req.method, req.headers);

    if(req.url === "/"){
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>Saroj Node Practice</title></head>');
        res.write('<body>');
        res.write('<h1>Enter your details.</h1>');
        res.write('<form action="/submit-userDetails" method="POST">');
        res.write('<input type="text" placeholder="Enter your name" name="username">');
        res.write("<br>");
        res.write('<label for="gender">Gender:  </label>');
        res.write('<label for="male">Male</label>');
        res.write('<input type="radio" id="male" name="gender" value="male">');
        res.write('<label for="female">Female</label>');
        res.write('<input type="radio" id="female" name="gender" value="female">');
        res.write("<br>");
        res.write('<button type="submit" value="Submit">Submit</button>')
        res.write('</form>');
        res.write('</body>')
        res.write('</html>');
        return res.end();
    }

    else if(req.url.toLowerCase() === "/submit-userdetails" && req.method == "POST"){
        fs.writeFileSync('user.txt', 'Saroj Gumanju');
        res.statusCode = 302; // 302 status code means redirection  
        res.setHeader('Location', '/');
        res.end();

    }
 
    // else if(req.url.toLowerCase() === "/products"){
    //     res.setHeader('Content-Type', 'text/html');
    //     res.write('<html>');
    //     res.write('<head><title>Saroj Node Practice</title></head>');
    //     res.write('<body><h1>This is product page.</h1></body>')
    //     res.write('</html>');
    //     return res.end();
    // }
    // else{
    //     res.setHeader('Content-Type', 'text/html');
    //     res.write('<html>');
    //     res.write('<head><title>Saroj Node Practice</title></head>');
    //     res.write('<body><h1>404 error page not found.</h1></body>')
    //     res.write('</html>');
    //     res.end();
    // }
});

const   PORT = 3001;
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
})