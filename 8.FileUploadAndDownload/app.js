// core module
const path = require("path");

// external module
const express = require("express");
const { default: mongoose } = require("mongoose");
const session = require('express-session'); // top of MongoDBStore 
const MongoDBStore = require('connect-mongodb-session')(session); // below of session
const multer = require('multer');
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
});

const randomString = (length) => {
  const characters = 'abcdefghijklmnopqrstuvwxyz';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  }, 
  filename: (req, file, cb) => {
    cb(null, randomString(10) + '-' + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
    cb(null, true);
  } else {
    cb(null, false);
  }
}

const multerOptions = {
  storage, fileFilter
};

app.use(express.urlencoded({ extended: true })); // parsing body
app.use(multer(multerOptions).single('photo'));
app.use(express.static(path.join(rootDir, "src"))); // Granting access to public folder
app.use("/uploads", express.static(path.join(rootDir, 'uploads')));
app.use("/host/uploads", express.static(path.join(rootDir, 'uploads')));
app.use("/homes/uploads", express.static(path.join(rootDir, 'uploads')));

app.use(session({
  secret: "Airbnb",
  resave: false,
  saveUninitialized: true,
  store: store,
}))


// middleware that checks whether a cookie indicates the user is logged in or not
app.use((req, res, next) => {
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