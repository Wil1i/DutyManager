const Duty = require("../models/Duty")
const User = require("../models/User")

const get = async (req, res) => {
    const users = await User.findAll({order : [['dutyHours', 'DESC'], ['dutyMinutes', 'DESC']]})
    const duties = await Duty.findAll()
    let dutyList = []

    duties.forEach(duty => { dutyList.push(duty.codePersoneli) })

    res.render("admin", {
        user : req.user,
        flash : req.flash(),
        users,
        dutyList,
        duties
    })
}

const post = (req, res) => {
    
}

module.exports = {
    get,
    post
}