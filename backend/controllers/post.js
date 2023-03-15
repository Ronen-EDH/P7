const { db } = require("../models/db");

const Posts = db.models.Post;

exports.getAllPosts = (req, res, next) => {
  Posts.findAll()
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((error) => {
      res.status(400).json({
        error: error.message,
      });
    });
};

exports.addPost = (req, res, next) => {};

exports.getSinglePost = (req, res, next) => {};
