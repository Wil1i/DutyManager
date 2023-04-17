const express = require("express");
const Router = new express.Router();

const apiDutyUsersController = require("../controllers/api/dutyUsersController.js");
Router.get("/duty/users", apiDutyUsersController.get);

const birthdayController = require("../controllers/api/birthdayController.js");
Router.post("/birthday", birthdayController.post);

const dutyController = require("../controllers/api/dutyController.js");
Router.post("/duty/change", dutyController.post);

module.exports = Router;
