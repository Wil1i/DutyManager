const Duty = require("../models/Duty")
const DutyInformation = require("../models/DutyInformation")
const User = require("../models/User")

const get = async (req, res) => {
    const users = await User.findAll()

    res.render("admin", {
        user : req.user,
        flash : req.flash(),
        users
    })
}

const post = (req, res) => {
    
}

module.exports = {
    get,
    post
}