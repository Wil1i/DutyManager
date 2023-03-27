const express = require("express")
const Router = express.Router()

const loginController = require("../controllers/loginController.js")
Router.get("/", loginController.get)
Router.post("/", loginController.post)

module.exports = Router