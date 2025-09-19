// core module
const path = require('path');

// external module
const express = require("express");

// local module
const userRouter = require("./routes/userRouter");
const hostRouter = require("./routes/hostRouter");
const rootDir = require("./utils/pathUtil")

// app for express
const app = express();


// middleware

app.use(express.urlencoded()); // parsing body
app.use(userRouter);
app.use("/host", hostRouter);

app.use(express.static((rootDir, 'public'))); 

app.use((req, res, next) => {
    res.status(404).sendFile(path.join(rootDir, 'views/404.html'));
});



const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running at address http://localhost:${PORT}`);
});