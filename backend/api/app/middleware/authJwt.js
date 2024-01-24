const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "No token provided.",
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized.",
      });
    }
    req.userId = decoded.id;
    next();
  });
};

isTourist = (req, res, next) => {
  User.findByPk(req.userId).then((user) => {
    user.getRole().then((role) => {
      if (role && role.name === "tourist") {
        next();
      } else {
        res.status(403).send({
          message: "Require Tourist Role.",
        });
      }
    });
  });
};

isManager = (req, res, next) => {
  User.findByPk(req.userId).then((user) => {
    user.getRole().then((role) => {
      if (role && role.name === "manager") {
        next();
      } else {
        res.status(403).send({
          message: "Require Manager Role.",
        });
      }
    });
  });
};

const authJwt = {
  verifyToken: verifyToken,
  isTourist: isTourist,
  isManager: isManager,
};
module.exports = authJwt;
