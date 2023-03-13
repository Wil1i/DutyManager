const { DataTypes } = require('sequelize');
const bcrypt = require("bcrypt")
const db = require("../configs/db")

const user = db.define('user', {

    id : {
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },

    codePersoneli : {
        type : DataTypes.STRING,
    },

    birthday : {
        type : DataTypes.STRING
    },

    firstName : {
        type : DataTypes.STRING
    },

    lastName : {
        type : DataTypes.STRING
    },

    profile : {
        type : DataTypes.STRING
    },

    userRank : {
        type :  DataTypes.STRING
    },

    dutyHours : {
        type : DataTypes.NUMBER
    },

    dutyMinutes : {
        type : DataTypes.NUMBER
    }

}, {
    timestamps : false
})

user.validPassword = (user, pwd) => {
    return bcrypt.compareSync(pwd, user.password)
}

user.encryptPassword = async (password) => {
    const saltRounds = 10
    const salt = await bcrypt.genSaltSync(saltRounds)
    const hash = await bcrypt.hashSync(password, salt)
    return hash
}

module.exports = user