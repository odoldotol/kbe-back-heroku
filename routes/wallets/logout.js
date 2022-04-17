// const { Users } = require("");
const jwt = require("jsonwebtoken");

module.exports = async (req, res) => {
  req.cookies.set("accessToken");
  req.status = 204; // No Content
};
