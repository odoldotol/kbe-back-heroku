const log = console.log;
const jwt = require("jsonwebtoken");

module.exports = async (req, res) => {
  log(`📌️walletAddr 동작`);

  let payload = req.body;
  // log(`📌️payload: ${JSON.stringify(payload)}`);

  // const decoded = jwt.verify(payload.accessToken, process.env.ACCESS_SECRET);
  // log(`📌️decoded: ${decoded}`);

  if (payload.accessToken) {
    const address = jwt.verify(payload.accessToken, process.env.ACCESS_SECRET);
    // log(`📌️${address}`);
    try {
      res.status(201);
      res.json({ walletAddr: address });
    } catch (e) {
      console.error(e);
      res.status(500);
    }
  } else {
    res.status(400);
  }
};
