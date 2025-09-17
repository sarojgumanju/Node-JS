const http = require("http");
const testingSyntax = require("./syntax");
const runTimeError = require("./runtime");
const logicalError = require("./logical");


const server = http.createServer((req, res) => {
    console.log(req.url);
    // testingSyntax();
    // runTimeError();
    logicalError();
});

const PORT = 3001;
server.listen(PORT, () => {
    console.log(`Server is running at address http://localhost:${PORT}`);
});