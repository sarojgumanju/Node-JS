// core module
const path = require('path');

// external module
const express = require ('express');
const userRouter = express.Router();

// local module
const rootDir = require("../utils/pathUtil");
const { registeredHome } = require("./hostRouter")

userRouter.get("/", (req, res, next) => {
    // res.sendFile(path.join(__dirname, '../', 'views/home.html'));
    // res.sendFile(path.join(rootDir, 'views', 'home.html'));
    res.render('home', {registeredHome, pageTitle:'airbnb Home'})
});

module.exports = userRouter;