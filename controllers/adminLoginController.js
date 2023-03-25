const passport = require("passport")

const get = (req, res) => {
    res.render("adminLogin", {flash : req.flash()})
}

const post = passport.authenticate("local", {
    failureRedirect: "/admin/login",
    failureFlash: true,
    session: true,
});

const loginSuccess = (req, res) => {
    res.redirect(req.session.redirectTo || "/admin")
    delete req.session.redirectTo;
}

module.exports = {
    get,
    post,
    loginSuccess
}