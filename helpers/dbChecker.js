const Setting = require("../models/Setting");
const User = require("../models/User");
const config = require("../configs/config.json");
const axios = require("axios");

const dbChecker = async () => {
  // Check first meet password
  const passwordResult = await Setting.findOne({ where: { name: "password" } });
  if (!passwordResult || !passwordResult.value) {
    await Setting.create({
      name: "password",
      value: "appleservice",
    });
    console.log(
      `First meet password created [ ${config.app.firstMeetPassword} ]`
    );
  }

  // Check for start code personeli
  const scpResult = await Setting.findOne({
    where: { name: "startCodePersoneli" },
  });
  if (!scpResult || !scpResult.value) {
    await Setting.create({
      name: "startCodePersoneli",
      value: config.app.startCodePersoneli,
    });
    console.log(
      `Start code personeli created [ ${config.app.startCodePersoneli} ]`
    );
  }

  // Check for last code personeli
  const lcpResult = await Setting.findOne({
    where: { name: "lastCodePersoneli" },
  });
  if (!lcpResult || !lcpResult.value) {
    await Setting.create({
      name: "lastCodePersoneli",
      value: config.app.startCodePersoneli,
    });
    console.log(
      `Last code personeli created [ ${config.app.startCodePersoneli} ]`
    );
  }

  // Check for user
  const userResult = await User.findAll();
  if (!userResult || !userResult[0]) {
    try {
      const createUserAdmin = await axios.post("/admin/new", {
        year: "0",
        month: "0",
        day: "0",
        firstName: config.defualtUser.firstName,
        lastName: config.defualtUser.lastName,
        rank: config.defualtUser.userRank,
        profile: "",
        dutyHours: 0,
        dutyMinutes: 0,
      });
      console.log(
        `Defualt user created [ ${createUserAdmin.id} | ${config.defualtUser.firstName} ${config.defualtUser.lastName} | ${config.defualtUser.userRank} ]`
      );
    } catch (error) {}
  }
};

module.exports = dbChecker;
