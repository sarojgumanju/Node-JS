const Home = require("../models/home");


//add home page
const getAddHome = (req, res, next) => {
  res.render('addHome', {pageTitle: 'Add Home to airbnb', currentPage: 'addHome'});
}

// home added page
const postAddHome = (req, res, next) => {
  // console.log('Home Registration successful for:', req.body, req.body.houseName);

  const { houseName, price, location, rating, photoUrl } = req.body;
  const home = new Home(houseName, price, location, rating, photoUrl);
  home.save();
  res.render('homeAdded', {pageTitle: 'Home Added Successfully', currentPage: 'homeAdded'});
}


// home page
const getHomes = (req, res, next) => {
  Home.fetchAll((registeredHomes) => 
    res.render("home", {
      registeredHomes: registeredHomes,
      pageTitle: 'airbnb Home',
      currentPage: "Home"
    })
  )
}
 

module.exports = {getAddHome, postAddHome, getHomes};


