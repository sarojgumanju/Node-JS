const Home = require("../models/home");

const getHomes = (req, res, next) => {
  Home.fetchAll((registeredHomes) =>
    res.render("store/home-list", {
      registeredHomes: registeredHomes,
      pageTitle: "airbnb Home",
      currentPage: "Home",
    })
  );
};

const getIndex = (req, res, next) => {
  Home.fetchAll((registeredHomes) =>
    res.render("store/index", {
      registeredHomes: registeredHomes,
      pageTitle: "Home list",
      currentPage: "index",
    })
  );
};

const getBookings = (req, res, next) => {
  res.render("store/booking", {
    pageTitle: " My Bookings",
    currentPage: "bookings",
  });
};

const getFavouriteList = (req, res, next) => {
  Home.fetchAll((registeredHomes) =>
    res.render("store/favourite-list", {
      registeredHomes,
      pageTitle: "Favourites",
      currentPage: "favourites",
    })
  );
};

const getHomeDetails = (req, res, next) => {
  const homeId = req.params.homeId;
  Home.findById(homeId, (home) => {
    if (!home) {
      console.log("Home not found.");
      res.redirect("/homes");
    } else {
      console.log("Home details found: ", home);
      res.render("store/home-detail", {
        home: home,
        pageTitle: "Home Detail",
        currentPage: "Home",
      });
    }
  });
};

module.exports = {
  getHomes,
  getBookings,
  getIndex,
  getFavouriteList,
  getHomeDetails,
};
