// core module
const path = require('path');

// external module
const express = require("express");

// local module
const homeRouter = require("./routes/homeRouter");
const contactRouter = require("./routes/contactRouter");
const rootDir = require("./utils/pathUtil");

const app = express();


// middleware
app.use(express.urlencoded());
app.use(homeRouter);
app.use(contactRouter);
app.use((req, res, next) => {
    res.status(404).sendFile(path.join(rootDir, 'views/404.html'))
})


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running at address http://localhost:${PORT}`);
});