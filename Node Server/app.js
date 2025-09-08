//----------------------- Simple Node.js server -----------------------------------------
// const http = require("http");

// function requestListener(req, res){
//     console.log(req);
// }
// http.createServer(requestListener);

// const server =  http.createServer((req,res) => {
//     console.log(req)
// });

// server.listen(3000);
// const PORT = 3000;
// server.listen(PORT, () => {
//     console.log(`Server running on address http://localhost:${PORT}`);
// })


// ------------------------- Exit Event loop --------------------------------

const http = require("http");
const server = http.createServer((req, res) => {
    console.log(req);
    process.exit(); // stop event loop
});

const   PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
})