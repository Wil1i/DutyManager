const User = require("../models/User")

const get = (req, res) => {

    res.render("loginPage", {
        user : req.user,
        flash : req.flash()
    })

}

const post = async (req, res) => {
    const targetUser = await User.findOne({
        where : {
            codePersoneli : req.body.codePersoneli
        }
    })

    res.send(targetUser || undefined)
}

module.exports = {
    get,
    post
}