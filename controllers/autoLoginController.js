const token = require("../helpers/token");
const config = require("../configs/config.json");
const axios = require("axios");

const get = (req, res) => {
  res.render("autoLogin", {
    token: req.query.token,
    id: req.query.id,
  });
};

const post = async (req, res) => {
  if (token.auth(req.body.token, req.body.id)) {
    const loginUser = await axios.post(
      `http://${config.app.ip}:${config.app.port}/?action=login`,
      { codePersoneli: req.body.id }
    );

    loginUser && loginUser.data.isDuty == false
      ? res.send({ ...loginUser.data, userIsAlreadyDuty: false })
      : res.send({ ...loginUser.data, userIsAlreadyDuty: true });
  } else {
    res.send(undefined);
  }
};

module.exports = {
  get,
  post,
};
