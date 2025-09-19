// core module
const path = require('path');

// external module
const express = require('express');
const homeRouter = express.Router();

// local module 
const rootDir = require("../utils/pathUtil");

homeRouter.get("/", (req, res, next) => {
    res.sendFile(path.join(__dirname, '../', 'views/home.html'));
});

module.exports = homeRouter;