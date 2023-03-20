const Duty = require("../models/Duty")
const DutyInformation = require("../models/DutyInformation")
const User = require("../models/User")
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

    const persianDate = new pDate()

    res.render("singleUserInformation.ejs", {
        user : req.user,
        flash : req.flash(),
        isUserOnDuty,
        dutyInformation,
        userInfo,
        d : {month : persianDate.month(), year : persianDate.year()}
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
                await findUser.update({dutyMinutes : 0}).then(() => {
                    res.send(true)
                })

            }else res.send(undefined)

            break;
        
        case "deleteHistory":

            const findDutyInformations = await DutyInformation.findAll({where : {codePersoneli : req.params.id}})
            findDutyInformations.forEach(async fdi => {
                await fdi.destroy()
            })

            setTimeout(() => {
                res.send(true)                
            }, 500);

            break;

        case "deleteUser":
            const findTargetUser = await User.findOne({where : {codePersoneli : req.params.id}})

            if(findTargetUser){
                const findUserDuty = await Duty.findOne({where : {codePersoneli : req.params.id}})
                if(findUserDuty) await findUserDuty.destroy()

                const userDutyInformations = await DutyInformation.findAll({where : {codePersoneli : req.params.id}})

                userDutyInformations.forEach(async ud => {
                    await ud.destroy()
                })

                await findTargetUser.destroy()
                res.send(true)
            }else res.send(undefined)

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