const User = require("../../models/User");

const post = async (req, res) => {
  const userInformation = await User.findOne({
    where: { codePersoneli: req.body.codePersoneli },
  });
  try {
    await userInformation.update({ birthday: req.body.birthday });
    return res.send(true);
  } catch (err) {
    return res.send(false);
  }
};

module.exports = {
  post,
};
