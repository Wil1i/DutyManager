const express = require("express");
const Router = new express.Router();

const apiDutyUsersController = require("../controllers/api/dutyUsersController.js");
Router.get("/duty/users", apiDutyUsersController.get);

const birthdayController = require("../controllers/api/birthdayController.js");
Router.post("/birthday", birthdayController.post);

module.exports = Router;
