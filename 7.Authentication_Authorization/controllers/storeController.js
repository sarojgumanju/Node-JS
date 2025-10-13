const Home = require("../models/home");
const Favourite = require("../models/favourite");


// ------------------------------ get Homes ---------------------------
const getHomes = (req, res, next) => {
  Home.find().then((registeredHomes) => {
    res.render("store/home-list", {
      registeredHomes: registeredHomes,
      pageTitle: "airbnb Home",
      currentPage: "Home",
      isLoggedIn: req.isLoggedIn,
      user: req.session.user,
    })
  }) 
};


// ------------------------------ get Index -------------------------------
const getIndex = (req, res, next) => {
  Home.find().then((registeredHomes) => {
    //  console.log("Session value: ", req.session)
    res.render("store/index", {
      registeredHomes: registeredHomes,
      pageTitle: "Home list",
      currentPage: "index",
      isLoggedIn: req.isLoggedIn,
      user: req.session.user,
    })
  })
};


// ------------------------------- get Bookings -----------------------------
const getBookings = (req, res, next) => {
  res.render("store/booking", {
    pageTitle: " My Bookings",
    currentPage: "bookings",
    isLoggedIn: req.isLoggedIn,
    user: req.session.user,
  });
};


// -------------------------------- get Home Details ----------------------------
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
        isLoggedIn: req.isLoggedIn,
        user: req.session.user,
      });
    }
  });
};


// -------------------------------- get Favourite List --------------------------
const getFavouriteList = (req, res, next) => {
  Favourite.find()
  .populate("houseId")
  .then((favourites) => {
    const favouriteHomes = favourites.map((fav) => fav.houseId);
    res.render("store/favourite-list", {
      favouriteHomes: favouriteHomes,
      pageTitle: "My Favourites",
      currentPage: "favourites",
      isLoggedIn: req.isLoggedIn,
      user: req.session.user,
    });
  });
};



// ------------------------------ Add To FAvourites -------------------------------
const postAddToFavourites = (req, res, next) => {
  const homeId = req.body.id;
  Favourite.findOne({houseId: homeId}).then((fav) => {
    if (fav) {
      console.log("Already marked as favourite");
    } else {
      fav = new Favourite({houseId: homeId});
      fav.save().then((result) => {
        console.log("Fav added: ", result);
      });
    }
    res.redirect("/favourites");
  }).catch(err => {
    console.log("Error while marking favourite: ", err);
  });
};

 

// --------------------------- Remove from Favourites -------------------------------
const postRemoveFromFavourites = (req, res, next) => {
  const homeId = req.params.homeId;
  Favourite.findOneAndDelete({houseId: homeId})
    .then((result) => {
      console.log("Fav Removed: ", result);
    })
    .catch((err) => {
      console.log("Error while removing favourite: ", err);
    })
    .finally(() => {
      res.redirect("/favourites");
    });
};

module.exports = {
  getHomes,
  getBookings,
  getIndex,
  getFavouriteList,
  getHomeDetails,
  postAddToFavourites,
  postRemoveFromFavourites
};
