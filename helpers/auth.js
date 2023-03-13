const isLoggedIn = (req, res, next) => {
    if(!req.user){
        req.flash("warning", "شما باید وارد حساب کاربری خود شوید")
        req.session.redirectTo = req.url;
        res.redirect("/admin")
        return;
    }

    next()
}

const isNotLoggedIn = (req, res, next) => {
    if(req.user){
        res.redirect("/")
        return;
    }

    next()
}

const isUserAdmin = (req, res, next) => {
    if(req.user.userRank !== "admin") return res.redirect("/");
    next()
}

module.exports = {
    isLoggedIn,
    isNotLoggedIn,
    isUserAdmin
}