const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;

checkDuplicateUsernameOrEmail = (req, res, next) => {
  User.findOne({
    where: {
      username: req.body.username,
    },
  }).then((user) => {
    if (user) {
      res.status(400).send({
        message: "Username is already in use, please try another.",
      });
      return;
    }
    User.findOne({
      where: {
        email: req.body.email,
      },
    }).then((user) => {
      if (user) {
        res.status(400).send({
          message: "Email is already in use, please try another.",
        });
        return;
      }
      next();
    });
  });
};

checkRoleExisted = (req, res, next) => {
  if (req.body.role && !ROLES.includes(req.body.role)) {
    res.status(400).send({
      message: "Role = " + req.body.role + " does not exist.",
    });
    return;
  }

  next();
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
  checkRoleExisted: checkRoleExisted,
};

module.exports = verifySignUp;
