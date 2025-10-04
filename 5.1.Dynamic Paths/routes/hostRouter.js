
// External Module
const express = require('express');
const hostRouter = express.Router();

// Local Module
const {getAddHome, postAddHome, getHostHomes, getEditHome, postEditHome} = require("../controllers/hostController");


// ------------------------- routing ------------------------------------
hostRouter.get("/add-home", getAddHome );
hostRouter.post("/home-added", postAddHome);
hostRouter.get('/host-home-list', getHostHomes);

hostRouter.get('/edit-home/:homeId', getEditHome);
hostRouter.post('/edit-home', postEditHome);


module.exports = hostRouter;
  