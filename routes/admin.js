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

const adminController = require("../controllers/adminController.js")
Router.get("/", adminController.get)
Router.post("/", adminController.post)

const adminLoginController = require("../controllers/adminLoginController")
Router.get("/login", isNotLoggedIn,adminLoginController.get)
Router.post("/login", isNotLoggedIn,adminLoginController.post, adminLoginController.loginSuccess)

module.exports = Router