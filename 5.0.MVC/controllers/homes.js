const registeredHomes = [];

//add home page
const getAddHome = (req, res, next) => {
  res.render('addHome', {pageTitle: 'Add Home to airbnb', currentPage: 'addHome'});
}

// home added page
const postAddHome = (req, res, next) => {
  console.log('Home Registration successful for:', req.body, req.body.houseName);
  // registeredHomes.push({houseName: req.body.houseName});
  registeredHomes.push(req.body);
  res.render('homeAdded', {pageTitle: 'Home Added Successfully', currentPage: 'homeAdded'});
}


// home page
const getHomes = (req, res, next) => {
  console.log(registeredHomes);
  res.render('home', {registeredHomes: registeredHomes, pageTitle: 'airbnb Home', currentPage: 'Home'});
}

module.exports = {getAddHome, postAddHome, getHomes};


