// const { Users } = require("");
const jwt = require("jsonwebtoken");
const log = console.log;

module.exports = async (req, res) => {
  log(`📌️login 동작`);
  let info = req.body;
  log(`${JSON.stringify(info)}`);

  if (info.account) {
    const token = jwt.sign(info.account, process.env.ACCESS_SECRET);
    log(`${token}`);
    try {
      res.status(201);
      res.json({ accessToken: token });
    } catch (e) {
      console.error(e);
      res.status(500);
    }
  } else {
    res.status(400);
  }
};
