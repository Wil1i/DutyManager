const Duty = require("../../models/Duty");

const post = async (req, res) => {
  const isUserDuty = await Duty.findOne({
    where: { codePersoneli: req.body.codePersoneli },
  });

  isUserDuty ? res.send(true) : res.send(false);
};

module.exports = {
  post,
};
