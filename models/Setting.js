const { DataTypes } = require('sequelize');
const db = require("../configs/db")

const Setting = db.define('settings', {

    id : {
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },

    name : {
        type : DataTypes.STRING
    },

    value : {
        type : DataTypes.STRING
    }

}, {
    timestamps : false
})

module.exports = Setting