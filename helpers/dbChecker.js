const Setting = require("../models/Setting")
const User = require("../models/User")
const config = require("../configs/config.json")
const axios = require("axios")

const dbChecker = async () => {
    // Check first meet password
    await Setting.findOne({where : {name : "password"}}).then(async (result) => {
        if(!result || !result.value){
            await Setting.create({
                name : "password",
                value : "appleservice"
            })
            console.log(`First meet password created [ ${config.app.firstMeetPassword} ]`)
        } 
    })

    // Check for start code personeli
    await Setting.findOne({where : {name : "startCodePersoneli"}}).then(async (result) => {
        if(!result || !result.value){
            await Setting.create({
                name : "startCodePersoneli",
                value : config.app.startCodePersoneli
            })
            console.log(`Start code personeli created [ ${config.app.startCodePersoneli} ]`)
        }
    })

    // Check for last code personeli
    await Setting.findOne({where : {name : "lastCodePersoneli"}}).then(async (result) => {
        if(!result || !result.value){
            await Setting.create({
                name : "lastCodePersoneli",
                value : config.app.startCodePersoneli
            })
            console.log(`Last code personeli created [ ${config.app.startCodePersoneli} ]`)
        }
    })

    // Check for user
    User.findAll().then(async result => {
        if(!result || !result[0]){
            await axios.post("/admin/new", {
                year : "0",
                month : "0",
                day : "0",
                firstName : config.defualtUser.firstName,
                lastName : config.defualtUser.lastName,
                userRank : config.defualtUser.userRank,
                dutyHours : 0,
                dutyMinutes : 0
            }).then((result) => {
                console.log(`Defualt user created [ ${result.id} | ${config.defualtUser.firstName} ${config.defualtUser.lastName} | ${config.defualtUser.userRank} ]`)
            })
        }
    })
}

module.exports = dbChecker