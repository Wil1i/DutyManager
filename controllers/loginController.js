const User = require("../models/User")

const get = (req, res) => {

    res.render("loginPage", {
        user : req.user,
        flash : req.flash()
    })

}

const post = async (req, res) => {
    if(req.query.action == "login"){
        const targetUser = await User.findOne({
            where : {
                codePersoneli : req.body.codePersoneli
            }
        })

        res.send(targetUser || undefined)
    }else if(req.query.action == "logout"){

    }else if(req.query.action == "password"){
        (req.body.password == "appleservice") ? res.send("ok") : res.send("no")
    }
}

module.exports = {
    get,
    post
}