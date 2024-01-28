const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  if (!req.body.role) {
    return res.status(400).send({ message: "Need to specify a role." });
  }
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    name: req.body.name,
    gender: req.body.gender,
    profileImage: req.body.profileImage,
    dateOfBirth: req.body.dateOfBirth,
  })
    .then((user) => {
      if (req.body.role) {
        Role.findOne({
          where: {
            name: req.body.role,
          },
        }).then((role) => {
          user.setRole(role).then(() => {
            res
              .status(201)
              .send({ message: "Account registered successfully." });
          });
        });
      }
    })
    .catch((err) => {
      return res.status(500).send({ message: err.message });
    });
};

exports.signin = (req, res) => {
  if (!req.body.username && !req.body.password) {
    return res
      .status(400)
      .send({ message: "Need to enter username and password." });
  } else if (!req.body.username) {
    return res.status(400).send({ message: "Need to enter username." });
  } else if (!req.body.password) {
    return res.status(400).send({ message: "Need to enter password." });
  }
  User.findOne({
    where: {
      username: req.body.username,
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User not found." });
      }
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!passwordIsValid) {
        return res.status(401).send({
          message: "Invalid Password. Please try again.",
        });
      }
      const token = jwt.sign({ userId: user.userId }, config.secret, {
        algorithm: "HS256",
        allowInsecureKeySizes: true,
        expiresIn: 86400,
      });
      var authorities = [];
      if (user.role) {
        authorities.push("ROLE_" + user.role.name.toUpperCase());
      }
      res.status(200).send({
        message: "Signed in to account successfully.",
        accessToken: token,
      });
    })
    .catch((err) => {
      return res.status(500).send({ message: err.message });
    });
};

exports.updateAccount = (req, res) => {
  const userId = req.userId;
  User.update(req.body, {
    where: { userId: userId },
  })
    .then((num) => {
      if (num >= 1) {
        res.status(200).send({ message: "Account updated successfully." });
      } else {
        res.status(404).send({ message: "User not found." });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.deleteAccount = (req, res) => {
  const userId = req.userId;

  User.destroy({
    where: { userId: userId },
  })
    .then((num) => {
      if (num === 1) {
        res.status(200).send({ message: "Account deleted successfully." });
      } else {
        res.status(404).send({ message: "User not found." });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
