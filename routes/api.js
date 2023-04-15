const express = require("express")
const Router = new express.Router()

const apiDutyUsersController = require("../controllers/api/dutyUsersController.js")
Router.get("/duty/users", apiDutyUsersController.get)

module.exports = Router