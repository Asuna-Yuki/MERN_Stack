const config = require("config");
const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  // GET token form header
  const token = req.header("x-auth-token");

  //Check if not token
  if (!token) {
    res.status(401).json({ msg: "no token , auth denied" });
  }

  //Verify token
  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));

    req.user = decoded.user;

    next();
  } catch (err) {
    res.status(401).json({ msg: "token is not valid" });
  }
};
