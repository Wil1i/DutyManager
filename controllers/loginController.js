const User = require("../models/User");
const Setting = require("../models/Setting");
const Duty = require("../models/Duty");
const DutyInformation = require("../models/DutyInformation");
const axios = require("axios");
const token = require("../helpers/token");

const get = (req, res) => {
  res.render("loginPage", {
    user: req.user,
    flash: req.flash(),
  });
};

const post = async (req, res) => {
  if (req.query.action == "login") {
    const targetUser = await User.findOne({
      where: {
        codePersoneli: req.body.codePersoneli,
      },
    });

    if (targetUser) {
      const isUserDuty = await Duty.findOne({
        where: { codePersoneli: req.body.codePersoneli },
      });
      if (!isUserDuty) {
        await axios
          .get("https://prayer.aviny.com/api/prayertimes/1")
          .then(async (pTime) => {
            let pDate = pTime.data.Today.split(" - ")[0].split("/");
            let pDate2 = pTime.data.Today.split(" - ")[1]
              .split(" ")[0]
              .split(":");
            if (pTime.data.Today.split(" - ")[1].split(" ")[1] == "PM")
              pDate2[0] = Number(pDate2[0]) + 12;

            let pHours = Number(pDate2[0]);
            let pMinutes = Number(pDate2[1]);
            let pMonth = Number(pDate[1]);
            let pDay = Number(pDate[2]);

            const diResult = await DutyInformation.create({
              codePersoneli: req.body.codePersoneli,
              startTime: `${pHours} : ${pMinutes}`,
              date: `${pDate[0]}/${pMonth}/${pDay}`,
            });
            await Duty.create({
              codePersoneli: req.body.codePersoneli,
              startTime: `${pHours} : ${pMinutes}`,
              infoID: diResult.id,
            });
            const data = {
              ...targetUser,
              isDuty: false,
              startTime: { hour: pHours, minute: pMinutes },
            };
            res.send(data);
          })
          .catch(() => {
            return res.json({ err: "internet connection" });
          });
      } else {
        const data = { ...targetUser, isDuty: true };
        res.send(data);
      }
    } else {
      res.send("undefined");
    }
  } else if (req.query.action == "logout") {
    const todayDuty = await Duty.findOne({
      codePersoneli: req.body.codePersoneli,
    });

    if (todayDuty) {
      await axios
        .get("https://prayer.aviny.com/api/prayertimes/1")
        .then(async (offDutyTime) => {
          let pDate2 = offDutyTime.data.Today.split(" - ")[1]
            .split(" ")[0]
            .split(":");
          if (offDutyTime.data.Today.split(" - ")[1].split(" ")[1] == "PM")
            pDate2[0] = Number(pDate2[0]) + 12;
          offDutyTime = [Number(pDate2[0]), Number(pDate2[1])];

          let onDutyTime = todayDuty.startTime.split(" : ");
          onDutyTime = onDutyTime.map((d) => Number(d));

          let dutyHours = offDutyTime[0] - onDutyTime[0];
          let dutyMinutes;
          if (offDutyTime[1] > onDutyTime[1]) {
            dutyMinutes = offDutyTime[1] - onDutyTime[1];
          } else {
            dutyHours--;
            offDutyTime[1] += 60;
            dutyMinutes = offDutyTime[1] - onDutyTime[1];
          }

          const workerInformation = await User.findOne({
            where: {
              codePersoneli: req.body.codePersoneli,
            },
          });

          let updatedHours = workerInformation.dutyHours + dutyHours;
          let updatedMinutes;
          if (workerInformation.dutyMinutes + dutyMinutes >= 60) {
            const um = workerInformation.dutyMinutes + dutyMinutes;
            updatedHours += (um - (um % 60)) / 60;
            updatedMinutes = um % 60;
          } else updatedMinutes = workerInformation.dutyMinutes + dutyMinutes;

          await workerInformation.update({ dutyHours: updatedHours });
          await workerInformation.update({ dutyMinutes: updatedMinutes });

          const dutyInformationToday = await DutyInformation.findByPk(
            todayDuty.infoID
          );

          offDutyTime[0] < 10
            ? (offDutyTime[0] = "0" + offDutyTime[0])
            : offDutyTime[0];

          offDutyTime[1] < 10
            ? (offDutyTime[1] = "0" + offDutyTime[1])
            : offDutyTime[1];

          await dutyInformationToday.update({
            endTime: `${offDutyTime[0]} : ${offDutyTime[1]}`,
          });
          await dutyInformationToday.update({
            time: `${dutyHours} : ${dutyMinutes}`,
          });

          await todayDuty.destroy();
        })
        .catch(() => {
          return res.json({ err: "internet connection" });
        });
    } else return res.send("not duty");
    return res.send("done");
  } else if (req.query.action == "password") {
    await Setting.findOne({ where: { name: "password" } }).then((result) => {
      req.body.password == result.value ? res.send("ok") : res.send("no");
    });
  }
};

module.exports = {
  get,
  post,
};
