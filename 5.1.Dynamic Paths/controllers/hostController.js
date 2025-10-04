const Home = require("../models/home");

const getAddHome = (req, res, next) => {
  res.render("host/edit-home", {
    pageTitle: "Add Home to airbnb",
    currentPage: "addHome",
    editing: false,
  });
};


const getHostHomes = (req, res, next) => {
  Home.fetchAll((registeredHomes) =>
    res.render("host/host-home-list", {
      registeredHomes: registeredHomes,
      pageTitle: "Host Homes List",
      currentPage: "host-homes",
    })
  );
};

const postAddHome = (req, res, next) => {
  const { houseName, description, price, location, rating, photoUrl } = req.body;
  const home = new Home(houseName, description, price, location, rating, photoUrl);
  home.save();

  res.render("host/homeAdded", {
    pageTitle: "Home Added Successfully",
    currentPage: "homeAdded",
  });
};

const getEditHome = (req, res, next) => {
  const homeId = req.params.homeId;
  const editing = req.query.editing === "true";
  Home.findById(homeId, (home) => {
    if (!home) {
      console.log("Home not found for editing.");
      return res.redirect("/host/host-home-list");
    }

    console.log(homeId, editing, home);
    res.render("host/edit-home", {
      home: home,
      pageTitle: "Edit your Home",
      currentPage: "host-homes",
      editing: editing,
    });
  });
};

const postEditHome = (req, res, next) => {
  const { id, houseName, description,  price, location, rating, photoUrl } = req.body;
  const home = new Home(houseName, description, price, location, rating, photoUrl);
  home.id = id;
  home.save();

  res.redirect("/host/host-home-list");
};

module.exports = { getAddHome, getHostHomes, postAddHome, getEditHome, postEditHome };
