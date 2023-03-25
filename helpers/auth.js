const isLoggedIn = (req, res, next) => {
    if(!req.user){
        req.flash("warning", "شما باید وارد حساب کاربری خود شوید")
        req.session.redirectTo = req.url;
        res.redirect("/admin/login")
        return;
    }

    next()
}

const isNotLoggedIn = (req, res, next) => {
    if(req.user){
        res.redirect("/admin")
        return;
    }

    next()
}

const isUserAdmin = (req, res, next) => {
    if(req.user.userRank != "مدیر" && req.user.userRank != "توسعه دهنده") return res.redirect("/admin/login");
    next()
}

module.exports = {
    isLoggedIn,
    isNotLoggedIn,
    isUserAdmin
}