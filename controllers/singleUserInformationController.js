const Duty = require("../models/Duty")
const DutyInformation = require("../models/DutyInformation")
const User = require("../models/User")
const Morakhasi = require("../models/Morakhasi")
const pDate = require("persian-date")

const get = async (req, res) => {

    let isUserOnDuty;
    await Duty.findOne({where : {
        codePersoneli : req.params.id
    }}).then((result) => {
        (result) ? isUserOnDuty = true : isUserOnDuty = false
    })

    const dutyInformation = await DutyInformation.findAll({where : {
        codePersoneli : req.params.id
    }, order : [['id', 'DESC']]})

    const userInfo = await User.findOne({
        where : {
            codePersoneli : req.params.id
        }
    })

    let morakhasi = await Morakhasi.findOne({where : {codePersoneli : req.params.id}}) || false

    const persianDate = new pDate()

    res.render("singleUserInformation.ejs", {
        user : req.user,
        flash : req.flash(),
        isUserOnDuty,
        dutyInformation,
        userInfo,
        morakhasi,
        d : {day : persianDate.day(), month : persianDate.month(), year : persianDate.year()}
    })
}

const post = async (req, res) => {
    switch (req.query.action) {
        case "resetWorkHours":
            
            const findUser = await User.findOne({where : {
                codePersoneli : req.params.id
            }})
            if(findUser){
                await findUser.update({dutyHours : 0})
                await findUser.update({dutyMinutes : 0}).then(() => { res.send(true) })

            }else res.send(undefined)

            break;
        
        case "deleteHistory":

            const findDutyInformations = await DutyInformation.findAll({where : {codePersoneli : req.params.id}})
            findDutyInformations.forEach(async fdi => { await fdi.destroy() })

            setTimeout(() => { res.send(true) }, 500);

            break;

        case "deleteUser":
            const findTargetUser = await User.findOne({where : {codePersoneli : req.params.id}})

            if(findTargetUser){
                const findUserDuty = await Duty.findOne({where : {codePersoneli : req.params.id}})
                if(findUserDuty) await findUserDuty.destroy()

                const userDutyInformations = await DutyInformation.findAll({where : {codePersoneli : req.params.id}})

                userDutyInformations.forEach(async ud => { await ud.destroy() })

                await findTargetUser.destroy()
                res.send(true)
            }else res.send(undefined)

            break;

        case "edit":
            const targetUser = await User.findOne({where : {codePersoneli : req.params.id}})
            if(targetUser.firstName != req.body.firstName) await targetUser.update({firstName : req.body.firstName})
            if(targetUser.lastName != req.body.lastName) await targetUser.update({lastName : req.body.lastName})
            if(targetUser.userRank != req.body.rank) await targetUser.update({userRank : req.body.rank})
            let newBirthday = [targetUser.birthday.split(" / ")[0], targetUser.birthday.split(" / ")[1], targetUser.birthday.split(" / ")[2]]
            if(newBirthday[0] != req.body.year) newBirthday[0] = Number(req.body.year)
            if(newBirthday[1] != req.body.month) newBirthday[1] = Number(req.body.month)
            if(newBirthday[2] != req.body.day) newBirthday[2] = Number(req.body.day)
            await targetUser.update({birthday : `${newBirthday[0]} / ${newBirthday[1]} / ${newBirthday[2]}`})

            if(req.file) await targetUser.update({profile : req.file.filename})
            res.redirect(`/admin/${req.params.id}`)
            break;

        case "morakhasi":
            await Morakhasi.create({
                codePersoneli : req.params.id,
                startTime : `${req.body.year}/${req.body.month}/${req.body.day}`,
                endTime : `${req.body.year2}/${req.body.month2}/${req.body.day2}`
            }).then(() => {
                res.redirect(`/admin/${req.params.id}`)
            })

            break;

        case "deleteMorakhasi":
            await Morakhasi.findOne({where : {codePersoneli : req.params.id}}).then(result => {
                if(result){
                    result.destroy().then(() => {
                        res.send(true)
                    })
                }
            })

            break;

        default:
            res.send(false)
            break;
    }
}

module.exports = {
    get,
    post
}