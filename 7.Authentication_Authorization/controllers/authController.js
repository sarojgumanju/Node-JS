const { check, validationResult } = require("express-validator");
const User = require("../models/user");
const bcrypt = require('bcrypt');


// -------------------------------- get LogIn --------------------------------
const getLogin = (req, res, next) => {
  res.render("auth/login", {
    pageTitle: "Login",
    currentPage: "login",
    isLoggedIn: false,
  });
};

// -------------------------------- post login ------------------------------
const postLogin = (req, res, next) => {
  // console.log(req.body);
  // res.cookie("isLoggedIn", true); // using cookie

  req.session.isLoggedIn = true; // using session
  res.redirect("/");
};

// -------------------------------- post logout -------------------------------
// using cookies
// const postLogout = (req, res, next) => {
// res.cookie("isLoggedIn", false);
// 'OR' res.clearCookie('isLoggedIn');
//     res.redirect("/login");
// }

const postLogout = (req, res, next) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
};

// ----------------------------------- get signup -------------------------------------------
const getSignup = (req, res, next) => {
  res.render("auth/signup", {
    pageTitle: "SignUp",
    currentPage: "signup",
    isLoggedIn: false,
    errors: [],
    oldInput: { firstName: "", lastName: "", email: "", userType: "" },
  });
};

// -------------------------------------- post Signup ----------------------------------------
const postSignup = [
  // First Name validation
  check("firstName")
    .notEmpty()
    .withMessage("First name is required")
    .trim()
    .isLength({ min: 2 })
    .withMessage("First name must be at least 2 characters long")
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage("First name should contain only alphabets"),

  // Last Name validation
  check("lastName")
    .matches(/^[a-zA-Z\s]*$/)
    .withMessage("Last name should contain only alphabets"),

  // Email validation
  check("email").isEmail().withMessage("Please enter a valid email."),

  // Password validation
  check("password")
    .isLength({ min: 5 })
    .withMessage("Password must be at least 5 characters long.")
    .matches(/[a-z]/)
    .withMessage("Password must contain at least one lower case.")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one upper case.")
    .matches(/[!@#$^&*(),.?":{}|<>;]/)
    .withMessage("Password must contain at least one special character.")
    .trim(),

  // Confirm password validation
  check("confirmPassword")
    .trim()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Password does not match");
      }
      return true;
    }),

  // userType validation
  check("userType")
    .notEmpty()
    .withMessage("User type is required")
    .isIn(["guest", "host"])
    .withMessage("Invalid user type."),

  // Terms and conditions validation
  check("terms")
    .notEmpty()
    .withMessage("You must accept the terms and conditions first")
    .custom((value) => {
      if (value != "on") {
        throw new Error("You must accept the terms and conditions first.");
      }
      return true;
    }),

  // Final handler middleware
  (req, res, next) => {
    const { firstName, lastName, email, password, userType } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).render("auth/signup", {
        pageTitle: "Sign Up",
        isLoggedIn: false,
        errors: errors.array().map((error) => error.msg),
        oldInput: {
          firstName,
          lastName,
          email,
          password,
          userType,
        },
      });
    }

    bcrypt
      .hash(password, 12)
      .then((hashPassword) => {
        const user = new User({
          firstName,
          lastName,
          email,
          password: hashPassword,
          userType,
        });
        return user.save();
      })
      .then(() => {
        res.redirect("/login");
      })
      .catch((err) => {
        return res.status(400).render("auth/signup", {
          pageTitle: "Sign Up",
          isLoggedIn: false,
          errors: [err.msg],
          oldInput: { firstName, lastName, email, password, userType },
        });
      });
      
  },
];

module.exports = { getLogin, postLogin, postLogout, getSignup, postSignup };
