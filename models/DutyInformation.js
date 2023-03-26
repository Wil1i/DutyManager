const { DataTypes } = require('sequelize');
const db = require("../configs/db")

const DutyInformation = db.define('dutyInformation', {

    id : {
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },

    codePersoneli : {
        type : DataTypes.TEXT,
    },

    startTime : {
        type : DataTypes.TEXT
    },

    endTime : {
        type : DataTypes.TEXT
    },

    date : {
        type : DataTypes.TEXT
    },

    time : {
        type : DataTypes.TEXT
    }

}, {
    timestamps : false
})

module.exports = DutyInformation