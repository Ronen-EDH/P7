const { db } = require("../models/db");

const Post = db.models.Post;
const PostRead = db.models.PostRead;
const User = db.models.User;

exports.getAllPosts = (req, res, next) => {
  Post.findAll()
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((error) => {
      res.status(400).json({
        error: error.message,
      });
    });
};

exports.isRead = (req, res, next) => {
  PostRead.findOne({ where: { userId: req.auth.userId, postId: req.params.id } })
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((error) => {
      res.status(400).json({
        error: error.message,
      });
    });
  // }
};

exports.addPost = (req, res, next) => {
  if (req.fileValidationError) {
    return res.status(400).json({ message: req.fileValidationError });
  }
  const data = {
    title: req.body.title,
    createdBy: req.auth.userId,
  };
  if (req.body.text) {
    data.text = req.body.text;
  }
  if (req.file) {
    const url = req.protocol + "://" + req.get("host");
    data.file = url + "/assets/" + req.file.filename;
    data.altText = req.body.altText;
  }
  let user, post;
  Post.create(data)
    .then((newPost) => {
      res.status(200).json(newPost);
      User.findOne({ where: { id: req.auth.userId } }).then((data) => {
        user = data;
        Post.findOne({ where: { id: newPost.id } }).then((data) => {
          post = data;
          user.addPosts(post);
        });
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error.message,
      });
    });
};

exports.toggleRead = (req, res, next) => {
  let user, post;
  User.findOne({ where: { id: req.auth.userId } })
    .then((data) => {
      user = data;
      Post.findOne({ where: { id: req.params.id } }).then((data) => {
        post = data;
        user.addPosts(post);
      });
    })
    .then(() => {
      res.status(200).json({
        message: "Post successfully read!",
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error.message,
      });
    });
};
