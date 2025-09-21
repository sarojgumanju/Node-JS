// core module
const path = require("path");

// external module
const express = require("express");

// local module
const userRouter = require("./routes/userRouter");
const hostRouter = require("./routes/hostRouter");
const rootDir = require("./utils/pathUtil");

// app for express
const app = express();

// serve static files (css, js, images, etc.)
app.use(express.static(path.join(rootDir, "public")));

// middleware
app.use(express.urlencoded({ extended: true }));

// routers
app.use(userRouter);              // /user related routes
app.use("/host", hostRouter);     // /host/add-home

// 404 page
app.use((req, res, next) => {
  res.status(404).sendFile(path.join(rootDir, "views", "404.html"));
});

// start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
