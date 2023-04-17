const User = require("../../models/User");

const post = async (req, res) => {
  const userInformation = await User.findOne({
    where: { codePersoneli: req.body.codePersoneli },
  });
  //   if (userInformation) {
  await userInformation
    .update({ birthday: req.body.birthday })
    .then(() => {
      return res.send(true);
    })
    .catch(() => {
      return res.send(false);
    });
  //   }
};

module.exports = {
  post,
};
