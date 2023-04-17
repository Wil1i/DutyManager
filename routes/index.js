const express = require("express");
const Router = express.Router();

const loginController = require("../controllers/loginController.js");
Router.get("/", loginController.get);
Router.post("/", loginController.post);

const autoLoginController = require("../controllers/autoLoginController.js");
Router.get("/al", autoLoginController.get);
Router.post("/al", autoLoginController.post);

const mobileVersionController = require("../controllers/mobileController.js");
Router.get("/mobile", mobileVersionController.get);

module.exports = Router;
