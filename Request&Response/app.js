// const http = require("http");
// const server = http.createServer((req, res) => {
//     console.log(req.url, req.method, req.headers);
//     process.exit(); 
// });

// const   PORT = 3000;
// server.listen(PORT, () => {
//     console.log(`Server running at http://localhost:${PORT}`);
// })


// --------------- routing requests ----------------------------
const http = require("http");
const server = http.createServer((req, res) => {
    console.log(req.url, req.method, req.headers);

    if(req.url === "/"){
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>Saroj Node Practice</title></head>');
        res.write('<body><h1>Saroj Gumanju Welcomes you.</h1></body>')
        res.write('</html>');
        return res.end();
    }
    else if(req.url.toLowerCase() === "/products"){
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>Saroj Node Practice</title></head>');
        res.write('<body><h1>This is product page.</h1></body>')
        res.write('</html>');
        return res.end();
    }
    else{
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>Saroj Node Practice</title></head>');
        res.write('<body><h1>404 error page not found.</h1></body>')
        res.write('</html>');
        res.end();
    }

    

});

const   PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
})