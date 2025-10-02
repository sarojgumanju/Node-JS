// core module
const path = require('path');

// external module
const express = require("express");

// local module
const storeRouter = require("./routes/storeRouter");
const hostRouter  = require("./routes/hostRouter");
const errorRouter = require("./routes/errorRouter")
const rootDir = require("./utils/pathUtil")

// app for express
const app = express();

// setting ejs
app.set('view engine', 'ejs');
app.set('views', 'views')


// Granting access to public folder
app.use(express.static(path.join(rootDir, 'src')));

app.use(express.urlencoded()); // parsing body


// routers
app.use(storeRouter);
app.use("/host", hostRouter);
app.use(errorRouter); // 404 handler (must be last)


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running at address http://localhost:${PORT}`);
});