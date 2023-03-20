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
    console.log(1)
    if(req.query.action == "login"){
        const targetUser = await User.findOne({
            where : {
                codePersoneli : req.body.codePersoneli
            }
        })
        await targetUser.update({firstName : "شایان"})
        await targetUser.update({lastName : "نصرآبادی"})
        await targetUser.update({userRank : "مدیر"})

        if(targetUser){

            const isUserDuty = await Duty.findOne({where : {codePersoneli : req.body.codePersoneli}})
            if(!isUserDuty){

                const persianTime = new Pdate()

                let pHours = persianTime.hours()
                let pMinutes = persianTime.minutes()
                let pMonth = persianTime.month()
                let pDay = persianTime.day();

                (pHours < 10) ? pHours = "0" + pHours : false;
                (pMinutes < 10) ? pMinutes = "0" + pMinutes : false;
                (pMonth < 10) ? pMonth = "0" + pMonth : false;
                (pDay < 10) ? pDay = "0" + pDay : false;

                await DutyInformation.create({
                    codePersoneli : req.body.codePersoneli,
                    startTime : `${pHours}`, //  : ${pMinutes}
                    date : `${persianTime.year()}/${pMonth}/${pDay}`
                }).then(async (diResult) => {
                    await Duty.create({
                        codePersoneli : req.body.codePersoneli,
                        startTime : `${persianTime.hours()}`, // :${persianTime.minutes()}
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
            let offDutyTime = new Pdate()
            offDutyTime = offDutyTime.hours()

            const onDutyTime = todayDuty.startTime

            let dutyHours = onDutyTime - offDutyTime
            // let dutyMinutes = onDutyTime[1] - offDutyTime[1]
            
            // if(onDutyTime[1] < offDutyTime[1])
                // dutyMinutes = offDutyTime[1] - onDutyTime[1]

            // while(true){
            //     if(dutyMinutes >= 60){
            //         dutyHours++
            //         dutyMinutes -= 60
            //     }else break
            // }

            const workerInformation = await User.findOne({
                where : {
                    codePersoneli : req.body.codePersoneli
                }
            })

            // let updatedMinutes = workerInformation.dutyMinutes + dutyMinutes
            let updatedHours = workerInformation.dutyHours + dutyHours
            // while (true){
            //     if(updatedMinutes >= 60){
            //         updatedMinutes -= 60
            //         updatedHours++
            //     }else break
            // }

            // await workerInformation.update({dutyMinutes : updatedMinutes})
            await workerInformation.update({dutyHours : updatedHours})

            const dutyInformationToday = await DutyInformation.findByPk(todayDuty.infoID);

            (offDutyTime < 10) ? offDutyTime = "0"+offDutyTime : offDutyTime;
            // (offDutyTime[1] < 10) ? offDutyTime[1] = "0"+offDutyTime[1] : offDutyTime[1];

            (onDutyTime < 10) ? onDutyTime = "0"+onDutyTime : onDutyTime;
            // (onDutyTime[1] < 10) ? onDutyTime[1] = "0"+onDutyTime[1] : onDutyTime[1];

            await dutyInformationToday.update({endTime : `${offDutyTime}`}) //  : ${offDutyTime[1]}
            await dutyInformationToday.update({time : dutyHours})

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