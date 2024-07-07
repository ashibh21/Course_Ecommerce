const { User } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

function userMiddleware(req, res, next) {
  const token = req.headers.authorization;

  const jwtTOken = token.split(" ")[1];
  const decodedvalue = jwt.verify(jwtTOken, JWT_SECRET);
  if (decodedvalue.username) {
    next();
  } else {
    res.status(403).json({
      message: "Not authenticated",
    });
  }
}

module.exports = userMiddleware;
