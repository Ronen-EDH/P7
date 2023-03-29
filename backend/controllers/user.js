const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { db } = require("../models/db");
require("dotenv").config();

const User = db.models.User;

exports.signup = (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then((hash) => {
    User.create({ email: req.body.email, password: hash })
      .then((user) => {
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET_KEY, { expiresIn: "24H" });
        res.status(200).json({
          message: "User added successfully!",
          token,
        });
      })
      .catch((error) => {
        res.status(500).json({
          error: error.message,
        });
      });
  });
};

exports.login = (req, res, next) => {
  User.findOne({ where: { email: req.body.email } })
    .then((user) => {
      // console.log("user.password:", user.password);
      // console.log("req.body.password:", req.body.password);
      if (!user) {
        return res.status(401).json({
          error: "Invalid email or password",
        });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({
              error: "Invalid email or password",
            });
          }
          console.log("Login successful!");
          // console.log(user.id);
          const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET_KEY, { expiresIn: "24H" });
          res.status(200).json({
            token: token,
          });
        })
        .catch((error) => {
          res.status(500).json({
            error: error.message,
            // msg: "from this place",
          });
        });
    })
    .catch((error) => {
      res.status(500).json({
        error: error.message,
        // msg: "from this other place",
      });
    });
};

exports.deleteAcc = (req, res, next) => {
  User.findOne({ where: { id: req.auth.userId } })
    .then((data) => {
      let user;
      user = data;
      // console.log("user to delete:", user);
      user
        .destroy()
        .then(() => {
          res.status(201).json({
            message: "Account successfully deleted!",
          });
        })
        .catch(() => {
          console.log("User not found");
        });
    })
    .catch((error) => {
      res.status(400).json({
        error: error.message,
      });
    });
};

exports.userInfo = (req, res, next) => {
  User.findOne({ where: { id: req.auth.userId } })
    .then((data) => {
      let user;
      user = data;
      // console.log("User email:", user.email);
      res.status(200).json(user.email);
    })
    .catch((error) => {
      res.status(400).json({
        error: error.message,
      });
    });
};
