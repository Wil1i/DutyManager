const User = require("../models/User")
const Setting = require("../models/Setting")
const Duty = require("../models/Duty")
const DutyInformation = require("../models/DutyInformation")
const axios = require("axios")

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

                const pTime = await axios.get("https://api.keybit.ir/time/")

                const pDate = pTime.data.date.full.official.usual.en.split("/")
                const pDate2 = pTime.data.time24.full.en.split(":")

                let pHours = Number(pDate2[0]) - 1
                let pMinutes = Number(pDate2[1])
                let pMonth = Number(pDate[1])
                let pDay = Number(pDate[2]);

                await DutyInformation.create({
                    codePersoneli : req.body.codePersoneli,
                    startTime : `${pHours} : ${pMinutes}`,  
                    date : `${pDate[0]}/${pMonth}/${pDay}`
                }).then(async (diResult) => {
                    await Duty.create({
                        codePersoneli : req.body.codePersoneli,
                        startTime : `${pHours} : ${pMinutes}`,
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
            res.send("undefined")
        }

        
    }else if(req.query.action == "logout"){

        const todayDuty = await Duty.findOne({
            codePersoneli : req.body.codePersoneli
        })

        if(todayDuty){
            let offDutyTime = await axios.get("https://api.keybit.ir/time/")

            const pDate = offDutyTime.data.date.full.official.usual.en.split("/")
            const pDate2 = offDutyTime.data.time24.full.en.split(":")
            offDutyTime = [Number(pDate2[0]) - 1, Number(pDate2[1])]

            let onDutyTime = todayDuty.startTime.split(" : ")
            onDutyTime = onDutyTime.map(d => Number(d))

            let dutyHours = offDutyTime[0] - onDutyTime[0]
            let dutyMinutes;
            if(offDutyTime[1] > onDutyTime[1]){
                dutyMinutes = offDutyTime[1] - onDutyTime[1]
            }else{
                dutyHours--;
                offDutyTime[1] += 60
                dutyMinutes = offDutyTime[1] - onDutyTime[1]
            }

            const workerInformation = await User.findOne({
                where : {
                    codePersoneli : req.body.codePersoneli
                }
            })

            let updatedHours = workerInformation.dutyHours + dutyHours
            let updatedMinutes;
            if(workerInformation.dutyMinutes + dutyMinutes >= 60){
                const um = workerInformation.dutyMinutes + dutyMinutes
                updatedHours += (um - (um % 60)) / 60
                updatedMinutes = um % 60
            }else updatedMinutes = workerInformation.dutyMinutes + dutyMinutes

            await workerInformation.update({dutyHours : updatedHours})
            await workerInformation.update({dutyMinutes : updatedMinutes})

            const dutyInformationToday = await DutyInformation.findByPk(todayDuty.infoID);

            (offDutyTime[0] < 10) ? offDutyTime[0] = "0"+offDutyTime[0] : offDutyTime[0];

            (offDutyTime[1] < 10) ? offDutyTime[1] = "0"+offDutyTime[1] : offDutyTime[1];

            await dutyInformationToday.update({endTime : `${offDutyTime[0]} : ${offDutyTime[1]}`})
            await dutyInformationToday.update({time : `${dutyHours} : ${dutyMinutes}`})

            await todayDuty.destroy()
        }else
            return res.send("not duty")
        return res.send("done")

    }else if(req.query.action == "password"){
        await Setting.findOne({where : {name : "password"}}).then((result) => {
            (req.body.password == result.value) ? res.send("ok") : res.send("no")
        })
    }
}

module.exports = {
    get,
    post
}