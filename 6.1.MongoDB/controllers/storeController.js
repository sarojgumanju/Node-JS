const Favourite = require("../models/favourite");
const Home = require("../models/home");

const getHomes = (req, res, next) => {
  Home.fetchAll().then((registeredHomes) => {
    res.render("store/home-list", {
      registeredHomes: registeredHomes,
      pageTitle: "airbnb Home",
      currentPage: "Home",
    })
  }) 
};

const getIndex = (req, res, next) => {
  Home.fetchAll().then((registeredHomes) => {
    res.render("store/index", {
      registeredHomes: registeredHomes,
      pageTitle: "Home list",
      currentPage: "index",
    })
  })
};

const getBookings = (req, res, next) => {
  res.render("store/booking", {
    pageTitle: " My Bookings",
    currentPage: "bookings",
  });
};

const getFavouriteList = (req, res, next) => {
  Favourite.getFavourites().then(favourites => {
    favourites = favourites.map(fav => fav.houseId);
    Home.fetchAll().then(registeredHomes => {
      console.log(favourites, registeredHomes);
      const favouriteHomes =  registeredHomes.filter(home => favourites.includes(home._id.toString()));
      res.render("store/favourite-list", {
        favouriteHomes: favouriteHomes,
        pageTitle: "MY Favourites",
        currentPage: "favourites"
      });
    })
  });
};


const getHomeDetails = (req, res, next) => {
  const homeId = req.params.homeId;
  // console.log(homeId);
  Home.findById(homeId).then((home) => {
    if (!home) {
      console.log("Home not found.");
      res.redirect("/homes");
    } else {
      // console.log("Home details found: ", home);
      res.render("store/home-detail", {
        home: home,
        pageTitle: "Home Detail",
        currentPage: "Home",
      });
    }
  });
};

const postAddToFavourites =(req, res, next) => {
  const homeId = req.body.id;
  const fav = new Favourite(homeId);
  fav.save()
  .then(result => console.log("Added to favourites: ", result))
  .catch(error => console.log("Error while adding to favourites: ", error))
  .finally(() => res.redirect("/favourites"));
}

 
const postRemoveFromFavourites = (req, res, next) => {
  const homeId = req.params.homeId;
  console.log("this is favourite home remove id: ", homeId);
  Favourite.deleteById(homeId)
  .then(result => console.log("Removed from favourites: ", result))
  .catch(error => console.log("Error while removing from favourites: ", error))
  .finally(() => res.redirect("/favourites"));
}

module.exports = {
  getHomes,
  getBookings,
  getIndex,
  getFavouriteList,
  getHomeDetails,
  postAddToFavourites,
  postRemoveFromFavourites
};
