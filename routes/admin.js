const express = require("express");
const { isLoggedIn, isNotLoggedIn, isUserAdmin } = require("../helpers/auth");
const Router = express.Router();
const uploader = require("../helpers/uploader");

const adminController = require("../controllers/adminController.js");
Router.get("/", isLoggedIn, isUserAdmin, adminController.get);
Router.post("/", isLoggedIn, isUserAdmin, adminController.post);

const adminLoginController = require("../controllers/adminLoginController");
Router.get("/login", isNotLoggedIn, adminLoginController.get);
Router.post(
  "/login",
  isNotLoggedIn,
  adminLoginController.post,
  adminLoginController.loginSuccess
);

const adminNewController = require("../controllers/adminNewController");
Router.get("/new", isLoggedIn, isUserAdmin, adminNewController.get);
Router.post("/new", uploader.single("file"), adminNewController.post);

const singleUserInformationController = require("../controllers/singleUserInformationController");
Router.get(
  "/:id",
  isLoggedIn,
  isUserAdmin,
  singleUserInformationController.get
);
Router.post(
  "/:id",
  isLoggedIn,
  isUserAdmin,
  uploader.single("file"),
  singleUserInformationController.post
);

module.exports = Router;
