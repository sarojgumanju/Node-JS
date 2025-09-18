const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use("/", (req, res, next) => {
    console.log("First dummy middleware", req.url, req.method);
    next();
});

app.use("/", (req, res, next) => {
    console.log("Second dummy middleware", req.url, req.method);
    next();
});

app.get("/", (req, res, next) => {
    console.log("Handling / for get", req.url, req.method);
    res.send(`<h1>Welcome to our website.</h1>`);
});

app.get("/contact-us", (req, res, next) => {
    console.log("Handling /contact-us for get", req.url, req.method);
    res.send(`
      <h1>Give your details.</h1>
      <form action="/contact-us" method="POST">
        <input type="text" name="name" placeholder="Enter your name."/>
        <input type="email" name="email" placeholder="Enter your email."/>
        <button type="submit">Submit</button>
      </form>  
    `);
});

app.post("/contact-us", (req, res, next) => {
    console.log("Handling contact-us for post before bodyparser", req.url, req.method, req.body); // req.body gives undefined cause the body is not parsed yet
    next();
});

app.use(bodyParser.urlencoded());

app.post("/contact-us", (req, res, next) => {
    console.log("Handling contact-us for post", req.url, req.method, req.body);
    res.send(`
        <h1>Thanks for your details.</h1>
        <h1>We will contact you soon.</h1>
    `);
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running at address http://localhost:${PORT}`);
})