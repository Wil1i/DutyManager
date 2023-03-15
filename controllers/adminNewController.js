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
    // try {
    //     await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toFile(__dirname + `../public/uploads/${req.file.originalname}`)
    //     res.status(201).send('Image uploaded succesfully')
    // } catch (error) {
    //     console.log(error)
    //     res.status(400).send(error)
    // }

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