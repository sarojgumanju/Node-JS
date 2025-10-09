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
    console.log(req.body);
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
        res.redirect('/login');
    });
};

module.exports = {getLogin, postLogin, postLogout};