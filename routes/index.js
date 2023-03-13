const express = require("express")
const { isLoggedIn, isNotLoggedIn, isUserAdmin } = require("../helpers/auth")
const { body } = require("express-validator")
const Router = express.Router()

const multer = require("multer")
const path = require("path")
const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, path.join(__dirname, "../public/uploads"))
    },
    filename : function (req, file, cb){
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9)
        const fileName = file.originalname.split(".")
        cb(null, `${file.fieldname}-${uniqueSuffix}.${fileName[fileName.length - 1]}`)
    }
})
const upload = multer({ storage })

const loginController = require("../controllers/loginController.js")
Router.get("/", loginController.get)
Router.post("/", loginController.post)

module.exports = Router