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
            codePersoneli : req.body.code
        }
    })

    res.json(targetUser || undefined)
}

module.exports = {
    get,
    post
}