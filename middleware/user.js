const { User } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

function userMiddleware(req, res, next) {
  const token = req.headers.authorization;

  const jwtTOken = token.split(" ")[1];
  try {
    const decodedvalue = jwt.verify(jwtTOken, JWT_SECRET);
    if (decodedvalue.username) {
      req.username = decodedvalue.username;
      console.log(req.usern);
      next();
    } else {
      res.status(403).json({
        message: "Not authenticated",
      });
    }
  } catch (e) {
    res.json({
      message: "Incorrect inputs",
    });
  }
}

module.exports = userMiddleware;
