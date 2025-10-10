// -------------------------------- get LogIn --------------------------------
const getLogin = (req, res, next) => {
 res.render('auth/login', {
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
}


// -------------------------------- post logout -------------------------------
// using cookies
// const postLogout = (req, res, next) => {
    // res.cookie("isLoggedIn", false);
    // 'OR' res.clearCookie('isLoggedIn');
//     res.redirect("/login");
// }

const postLogout = (req, res, next) => {
    req.session.destroy(() => {
        res.redirect('/');
    });
};



const getSignup = (req, res, next) => {
    res.render('auth/signup', {
        pageTitle: 'SignUp',
        currentPage: 'signup',
        isLoggedIn: false,
    })
}


const postSignup = [
    // First Name validation
    check("firstName")
    .notEmpty()
    .withMessage('First name is required')
    .trim()
    .isLength({ min: 2 })
    .withMessage('First name must be at least 2 characters long')
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage('First name should contain only alphabets'),


    // Last Name validation
    check("lastName")
    .matches(/^[a-zA-Z\s]*$/)
    .withMessage('Last name should contain only alphabets'),


    // Email validation
    check("email")
    .isEmail()
    .withMessage('Please enter a valid email.'),


    // Password validation
    check('password')
    .isLength({ min: 5 })
    .withMessage('Password must be at least 8 characters long.')
    .matches(/[a-z]/)
    .withMessage('Password must contain at leas one lower case.')
    .matches(/[A-A]/)
    .withMessage('Password must contain at leas one upper case.')
    .matches(/[!@#$^&*(),.?":{}|<>;]/)
    .withMessage('Password must contain at least one special character.')
    .trim(),


    // Confirm password validation
    check('confirmPassword')
    .trim()
    .custom((value, { req }) => {
        if(value !== req.body.password){
            throw new Error('Password does not match')
        }
        return true;
    }),


    // userType validation
    check('userType')
    .notEmpty()
    .withMessage("User type is required")
    .isIn(['guest', 'host'])
    .withMessage("Invalid user type."),


    // Terms and conditions validation
    check('terms')
    .notEmpty()
    .withMessage('You must accept the terms and conditions first')
    .custom((value) => {
        if(value != 'on'){
            throw new Error('You must accept the terms and conditions first.')
        }
        return true;
    }),
    
    (req, res, next) => {
    console.log(req.body);
    res.redirect('/login');
}]

module.exports = {getLogin, postLogin, postLogout, getSignup, postSignup};