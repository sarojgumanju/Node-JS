const Home = require("../models/home");

const getHomes = (req, res, next) => {
  Home.fetchAll((registeredHomes) => 
    res.render("store/home-list", {
      registeredHomes: registeredHomes,
      pageTitle: 'airbnb Home',
      currentPage: "Home"
    })
  )
};

const getIndex = (req, res, next) => {
  Home.fetchAll((registeredHomes) => 
    res.render("store/index", {
      registeredHomes: registeredHomes,
      pageTitle: 'Home list',
      currentPage: "index"
    })
  )
};

const getBookings = (req, res, next) => {
    res.render("store/booking", {
      pageTitle: " My Bookings", 
      currentPage: "bookings"
    })
};

const getFavouriteList = (req, res, next) => {
  Home.fetchAll((registeredHomes) => 
    res.render("store/favourite-list", {
    registeredHomes,
    pageTitle: "Favourites", 
    currentPage: "favourites"
  })
  )
}

 

module.exports = {getHomes, getBookings, getIndex, getFavouriteList };


