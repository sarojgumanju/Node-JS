// core module
const path = require('path');

// external module
const express = require("express");
const hostRouter = express.Router();

// local module
const rootDir = require("../utils/pathUtil");

hostRouter.get("/add-home", (req, res, next) => {
    // res.sendFile(path.join(__dirname, '../', 'views/addHome.html'));
    // filehelper
    // res.sendFile(path.join(rootDir, 'views', 'addHome.html'));

    res.render('addHome', {pageTitle: 'Add Home to aribnb'})
});

const registeredHome = [];

hostRouter.post("/add-home", (req, res, next) => {
    console.log(req.body.houseName);
    registeredHome.push({houseName: req.body.houseName});
    // res.sendFile(path.join(__dirname, '../', 'views/homeAdded.html'));
    // res.sendFile(path.join(rootDir, 'views', 'homeAdded.html'));

    res.render('homeAdded', {pageTitle: 'Home Added Successfully'});
    console.log(registeredHome);
});


module.exports = {hostRouter, registeredHome};
