const Duty = require("../../models/Duty");

const get = async (req, res) => {
  const dutyUsers = await Duty.findAll();
  let result = [];
  dutyUsers.forEach((u) => {
    result.push(`${dutyUsers.firstName} ${dutyUsers.lastName}`);
  });
  return result;
};

module.exports = {
  get,
};
