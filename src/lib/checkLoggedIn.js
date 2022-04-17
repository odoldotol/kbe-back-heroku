const checkLoggedIn = async (req, res, next) => {
    const user = req.state;
    if (!user) {
      // 로그인 중이 아님
      req.status = 401; // Unauthorized
      return;
    }
    return next();
  };
  
  module.exports = checkLoggedIn;
  