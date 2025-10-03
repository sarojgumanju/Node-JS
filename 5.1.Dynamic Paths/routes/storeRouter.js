
// External Module
const express = require('express');
const storeRouter = express.Router();

// Local Module
const {getHomes, getBookings, getFavouriteList, getIndex, getHomeDetails} = require("../controllers/storeController")

storeRouter.get("/", getIndex);
storeRouter.get("/homes", getHomes);
storeRouter.get("/bookings", getBookings);
storeRouter.get("/favourites", getFavouriteList);

storeRouter.get("/homes/:homeId", getHomeDetails);

module.exports = storeRouter;