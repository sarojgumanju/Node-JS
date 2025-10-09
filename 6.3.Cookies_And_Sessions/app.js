// core module
const path = require("path");

// external module
const express = require("express");
const { default: mongoose } = require("mongoose");
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const DB_PATH = "mongodb://localhost:27017/airbnb";


// local module
const storeRouter = require("./routes/storeRouter");
const hostRouter = require("./routes/hostRouter");
const errorRouter = require("./routes/errorRouter");
const authRouter = require('./routes/authRouter');
const rootDir = require("./utils/pathUtil");


// app for express
const app = express();

// setting ejs
app.set("view engine", "ejs");
app.set("views", "views");

const store = new MongoDBStore({
  uri: DB_PATH,
  collection: 'sessions'
})

// Granting access to public folder
app.use(express.static(path.join(rootDir, "src")));
app.use(express.urlencoded()); // parsing body

app.use(session({
  secret: "Airbnb",
  resave: false,
  saveUninitialized: true,
  store: store,
}))


// middleware that checks whether a cookie indicates the user is logged in or not
app.use((req, res, next) => {
  // console.log('Cookie check middleware', req.get('Cookie'));
  // req.isLoggedIn = req.get('Cookie') ? req.get('Cookie').split('=')[1] === 'true' : false;

  req.isLoggedIn = req.session.isLoggedIn;
  next();
});


// routers
// ---------------------------------- for store -------------------------------------
app.use(["/homes", "/bookings", "/favourites"], (req, res, next) => {
  if(req.isLoggedIn){
    next();
  }
  else{
    res.redirect("/login");
  }
});
app.use(storeRouter);


// ----------------------------------- for host -----------------------------------------
app.use("/host", (req, res, next) => {
  if(req.isLoggedIn){
    next();
  }
  else{
    res.redirect("/login");
  }
});
app.use("/host", hostRouter);


// ---------------------------------- for authentication and error ------------------------
app.use(authRouter);
app.use(errorRouter); // 404 handler (must be last)


const PORT = 3000;
mongoose.connect(DB_PATH).then(() => {
  console.log("Connected to Mongo.")
  app.listen(PORT, () => {
    console.log(`Server is running at address http://localhost:${PORT}`);
  });
}).catch(err => {
  console.log("Error while connecting to mongo: ", err);
})
