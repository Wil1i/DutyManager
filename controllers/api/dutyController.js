const Duty = require("../../models/Duty");
const axios = require("axios");

const post = async (req, res) => {
  const isUserDuty = await Duty.findOne({
    where: { codePersoneli: req.body.codePersoneli },
  });
  if (isUserDuty) {
    axios
      .post("/?action=logout", { codePersoneli: req.body.codePersoneli })
      .then(() => {
        res.send(true);
      });
  } else {
    axios
      .post("/?action=login", { codePersoneli: req.body.codePersoneli })
      .then(() => {
        res.send(true);
      });
  }
};

module.exports = {
  post,
};
