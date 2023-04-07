const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { db } = require("../models/db");
require("dotenv").config();
const validator = require("validator");
const fs = require("fs");

const User = db.models.User;
const Post = db.models.Post;

exports.signup = (req, res, next) => {
  if (!validator.isEmail(req.body.email))
    return res.status(400).json({
      error: "Invalid email format",
    });
  /*
    {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1
    }
  */
  if (!validator.isStrongPassword(req.body.password))
    return res.status(400).json({
      error: "Password is not strong enough!",
    });
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
// This way is better!
/*   const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET_KEY, { expiresIn: "24H" }, function (err) {
  if (err) {
    return res.status(403).json({
      error: err,
    });
  }
}); */

exports.signin = (req, res, next) => {
  User.findOne({ where: { email: req.body.email } })
    .then((user) => {
      if (!user) {
        return res.status(401).json({
          error: "Invalid email or password!",
        });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({
              error: "Invalid email or password!",
            });
          }
          console.log("Sign in successful!");
          const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET_KEY, { expiresIn: "24H" });
          res.status(200).json({
            token: token,
          });
        })
        .catch((error) => {
          res.status(500).json({
            error: error.message,
          });
        });
    })
    .catch((error) => {
      res.status(500).json({
        error: error.message,
      });
    });
};

exports.deleteAcc = (req, res, next) => {
  Post.findAll({ where: { createdBy: req.auth.userId } })
    .then((data) => {
      console.log("data:", data);
      if (data != []) {
        console.log("it runs");
        data.map((post) => {
          if (post.file) {
            const filename = post.file.split("/assets/")[1];
            fs.unlink("assets/" + filename, () => {
              console.log(post.file, "deleted!");
            });
          }
        });
        Post.destroy({ where: { createdBy: req.auth.userId } })
          .then(() => {
            // res.status(201).json({
            //   message: "Posts successfully deleted!",
            // });
            console.log("Posts successfully deleted!");
          })
          .catch((error) => {
            res.status(500).json({
              error: error.message,
            });
          });
      }
    })
    .catch((error) => {
      res.status(500).json({
        error: error.message,
      });
    });
  User.findOne({ where: { id: req.auth.userId } })
    .then((data) => {
      let user;
      user = data;
      user
        .destroy()
        .then(() => {
          res.status(201).json({
            message: "Account successfully deleted!",
          });
        })
        .catch((error) => {
          res.status(500).json({
            error: error.message,
          });
        });
    })
    .catch((error) => {
      res.status(500).json({
        error: error.message,
      });
    });
};

exports.userInfo = (req, res, next) => {
  User.findOne({ where: { id: req.auth.userId } })
    .then((data) => {
      let user;
      user = data;
      res.status(200).json(user.email);
    })
    .catch((error) => {
      res.status(500).json({
        error: error.message,
      });
    });
};
