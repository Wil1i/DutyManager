const User = require("../models/User")
const Setting = require("../models/Setting")
const Duty = require("../models/Duty")
const DutyInformation = require("../models/DutyInformation")
const Pdate = require("persian-date")

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
        if(targetUser){

            const isUserDuty = await Duty.findOne({where : {codePersoneli : req.body.codePersoneli}})
            if(!isUserDuty){

                const persianTime = new Pdate()
                await DutyInformation.create({
                    codePersoneli : req.body.codePersoneli,
                    startTime : `${persianTime.hours()} : ${persianTime.minutes()}`,
                    date : `${persianTime.year()}/${persianTime.month()}/${persianTime.day()}`
                }).then(async (diResult) => {
                    await Duty.create({
                        codePersoneli : req.body.codePersoneli,
                        startTime : `${persianTime.hours()}:${persianTime.minutes()}`,
                        infoID : diResult.id
                    })
                })
                const data = {...targetUser, isDuty : false}
                res.send(data)
            }else{
                const data = {...targetUser, isDuty : true}
                res.send(data)
            }
            
        }else{
            res.send(undefined)
        }

        
    }else if(req.query.action == "logout"){

        const todayDuty = await Duty.findOne({
            codePersoneli : req.body.codePersoneli
        })

        if(todayDuty){
            let offDutyTime = new Pdate()
            offDutyTime = [offDutyTime.hours(), offDutyTime.minutes()]

            const onDutyTime = todayDuty.startTime.split(":").map(time => {
                return Number(time)
            })

            let dutyHours = onDutyTime[0] - offDutyTime[0]
            let dutyMinutes = onDutyTime[1] - offDutyTime[1]
            
            if(onDutyTime[1] < offDutyTime[1])
                dutyMinutes = offDutyTime[1] - onDutyTime[1]

            while(true){
                if(dutyMinutes >= 60){
                    dutyHours++
                    dutyMinutes -= 60
                }else break
            }

            console.log(`${dutyHours} : ${dutyMinutes}`)

            const workerInformation = await User.findOne({
                where : {
                    codePersoneli : req.body.codePersoneli
                }
            })

            let updatedMinutes = workerInformation.dutyMinutes + dutyMinutes
            let updatedHours = workerInformation.dutyHours + dutyHours
            while (true){
                if(updatedMinutes >= 60){
                    updatedMinutes -= 60
                    updatedHours++
                }else break
            }

            await workerInformation.update({dutyMinutes : updatedMinutes})
            await workerInformation.update({dutyHours : updatedHours})

            const dutyInformationToday = await DutyInformation.findByPk(todayDuty.infoID)
            dutyInformationToday.update({endTime : `${offDutyTime[0]} : ${offDutyTime[1]}`})

            await todayDuty.destroy()
        }else
            return res.send("not duty")
        return res.send("done")

    }else if(req.query.action == "password"){
        await Setting.findOne({where : {name : "password"}}).then((result) => {
            (req.body.password = result.value) ? res.send("ok") : res.send("no")
        })
    }
}

module.exports = {
    get,
    post
}