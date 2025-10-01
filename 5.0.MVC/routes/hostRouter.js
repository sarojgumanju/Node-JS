
// External Module
const express = require('express');
const hostRouter = express.Router();

// Local Module
const {getAddHome, postAddHome} = require("../controllers/homes");


// ------------------------- routing ------------------------------------
hostRouter.get("/add-home", getAddHome );
hostRouter.post("/home-added", postAddHome);


module.exports = hostRouter;
  