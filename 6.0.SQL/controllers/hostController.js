const Home = require("../models/home");

const getAddHome = (req, res, next) => {
  res.render("host/edit-home", {
    pageTitle: "Add Home to airbnb",
    currentPage: "addHome",
    editing: false,
  });
};


const getHostHomes = (req, res, next) => {
  Home.fetchAll().then(([registeredHomes]) => {
    res.render("host/host-home-list", {
      registeredHomes: registeredHomes,
      pageTitle: "Host Homes List",
      currentPage: "host-homes",
    })
  })
};

const postAddHome = (req, res, next) => {
  const { id,  houseName, description, price, location, rating, photoUrl } = req.body;
  const home = new Home(id, houseName, description, price, location, rating, photoUrl);
  console.log("Request body:", req.body);
  
  home.save();

  res.render("host/homeAdded", {
    pageTitle: "Home Added Successfully",
    currentPage: "homeAdded",
  });
};

const getEditHome = (req, res, next) => {
  const homeId = req.params.homeId;
  const editing = req.query.editing === "true";
  Home.findById(homeId).then(([homes]) => {
    const home = homes[0];
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
  const home = new Home(id, houseName, description, price, location, rating, photoUrl);
  console.log("Request body:", req.body);
  home.save();
  res.redirect("/host/host-home-list");
};

const postDeleteHome = (req, res, next) => {
  const homeId = req.params.homeId;
  // console.log("this is id of the home to be deleted: ", homeId);
  Home.deleteById(homeId).then(() => {
    res.redirect("/host/host-home-list");
  })
  .catch(err => {
    console.log("Error while deleting: ", err);
  })
    
}

module.exports = { getAddHome, getHostHomes, postAddHome, getEditHome, postEditHome, postDeleteHome};
