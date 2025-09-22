// core module
const path = require('path');

// external module
const express = require("express");

// local module
const userRouter = require("./routes/userRouter");
const {hostRouter} = require("./routes/hostRouter");
const rootDir = require("./utils/pathUtil")

// app for express
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');


// middleware
app.use(express.urlencoded()); // parsing body


// Serve static files from "views"
app.use(express.static(path.join(rootDir, "views")));

app.use(userRouter);
app.use("/host", hostRouter);
app.use((req, res, next) => {
    res.status(404).render(('404', {pageTitle: 'Page not found'}));
})



const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running at address http://localhost:${PORT}`);
});