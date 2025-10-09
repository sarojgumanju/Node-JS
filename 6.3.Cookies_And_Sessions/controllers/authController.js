// -------------------------------- get LogIn --------------------------------
const getLogin = (req, res, next) => {
 res.render('auth/login', {
    pageTitle: "Login",
    currentPage: "login"
 });
};


// -------------------------------- post login ------------------------------
const postLogin = (req, res, next) => {
    const {username, password} = req.body;
    res.redirect("/");
}

module.exports = {getLogin,postLogin};