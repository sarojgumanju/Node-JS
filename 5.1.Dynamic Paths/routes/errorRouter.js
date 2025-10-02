// External module
const express = require('express');
const errorRouter = express.Router();

// local module 
const {pageNotFound} = require("../controllers/error");

// Catch all routes that are not handled by other routers
errorRouter.use("", pageNotFound);

module.exports = errorRouter;