const jwt = require("jsonwebtoken");
const log = console.log;

const jwtMiddleware = (req, res, next) => {
  log(`📌️jwtMiddleware 동작`);

  let payload = req.body;
  log(`${JSON.stringify(payload)}`);

  next();
  // if (!payload) return next(); // 토큰이 없음

  // try {
  //   // 토큰이 있고 검증 완료됨
  //   const decoded = jwt.verify(payload.accessToken, process.env.ACCESS_SECRET);
  //   log(`📌️${decoded}`);
  //   return next(decoded);
  // } catch (e) {
  //   // 토큰 검증 실패
  //   return next();
  // }
};

module.exports = jwtMiddleware;
