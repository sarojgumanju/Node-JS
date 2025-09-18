// core module
// const http = require("http");

// external module
const express = require("express");

// local module
const userRequestHandler = require("./user");

const app = express();


// ------------------------------------- Adding middleware --------------------------------------
// app.use((req, res, next) => {
//     console.log("Came in first middleware", req.url, req.method);
//     next();
// });

// app.use((req, res, next) => {
//     console.log("Came in second middleware", req.url, req.method);
//     res.send("<h1>Hello welcome to my website.</h1>");
// });


// ------------------------------------- Handling routes ---------------------------------------------
app.use("/", (req, res, next) => {
    console.log("First middleware", req.method);
    // res.send("I am from first middleware."); // error: cannot call next() after send()
    next();
});

app.use("/submit-userDetails", (req, res, next) => {
    console.log("This is userDetails middleware", req.method);
    res.send("<h1>I am from userDetails middleware</h1>",)
});

app.use("/products", (req, res, next) => {
    console.log("This is product middleware", req.url, req.method);
    res.send("<h1>I am fromm product middleware.</h1>")
})

app.use("/", (req, res, next) => {
    console.log("last middleware", req.method);
    res.send("<h1>I am from last middlware.</h1>")
})




// --------------------------------------------------------------------------------------------------
// const server = http.createServer(app);
// const PORT = 3000;
// server.listen(PORT, () => {
//     console.log(`Server is running at address http://localhost:${PORT}`);
// });

// creating server using app(express)
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Sever is running at address http://localhost:${PORT}`);
})