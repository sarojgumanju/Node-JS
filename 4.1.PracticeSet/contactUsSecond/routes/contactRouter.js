// core module
const path = require('path');

// external module
const express = require('express');
const contactRouter = express.Router();

// local module
const rootDir = require("../utils/pathUtil");

contactRouter.get("/contact-us", (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views/contactUs.html'));
});

contactRouter.post("/contact-us", (req, res, next) => {
    console.log(req.body)
    res.sendFile(path.join(rootDir, 'views/contact-success.html'));
});

module.exports = contactRouter;