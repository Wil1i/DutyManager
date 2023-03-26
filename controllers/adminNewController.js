// const sharp = require("sharp")
const User = require("../models/User")
const Setting = require("../models/Setting")

const get = (req, res) => {
    res.render("adminNew",{
        user : req.user,
        flash : req.flash()
    })
}

const post = async (req, res) => {

    const lastCodePersoneli = await Setting.findOne({
        where : {
            name : "lastCodePersoneli"
        }
    })

    let codePersoneli;
    if(!lastCodePersoneli.value || lastCodePersoneli.value == 0){

        const startCodePersoneli = await Setting.findOne({
            where : {
                name : "startCodePersoneli"
            }
        })

        codePersoneli = Number(startCodePersoneli.value)

    }else codePersoneli = Number(lastCodePersoneli.value) + 1

    await User.create({
        codePersoneli,
        birthday : `${req.body.year} / ${req.body.month} / ${req.body.day}`,
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        userRank : req.body.rank,
        profile : (req.file) ? req.file.filename : undefined,
        dutyHours : 0,
        dutyMinutes : 0
    })

    await lastCodePersoneli.update({value : codePersoneli})

    res.redirect("/admin")
}

module.exports = {
    get,
    post
}