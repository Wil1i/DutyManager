const isLoggedIn = (req, res, next) => {
	console.log(req.user)
  if (!req.user) {
    req.flash("warning", "شما باید وارد حساب کاربری خود شوید");
    req.session.redirectTo = req.url;
    res.redirect("/duty/admin/login");
    return;
  }

  next();
};

const isNotLoggedIn = (req, res, next) => {
  if (req.user) {
    res.redirect("/duty/admin");
    return;
  }

  next();
};

const isUserAdmin = (req, res, next) => {
	return next();
  if (req.user.userRank != "مدیر" && req.user.userRank != "توسعه دهنده")
    return res.redirect("/duty/admin/login");
  next();
};

module.exports = {
  isLoggedIn,
  isNotLoggedIn,
  isUserAdmin,
};
