const { db } = require("../models/db");

const Post = db.models.Post;
const PostRead = db.models.PostRead;

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
  // console.log("Works");
  console.log("body:", req.body);
  PostRead.findOne({ where: { userId: req.auth.userId, postId: req.body.id } })
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((error) => {
      res.status(400).json({
        error: error.message,
      });
    });
};

exports.addPost = (req, res, next) => {
  // req.body.post = JSON.parse(req.body.post)
  Post.create({ title: req.body.title, text: req.body.text, img: req.body.img })
    .then(() => {
      res.status(200).json({
        message: "Post created successfully!",
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error.message,
      });
    });
};

// const user = await User.findOne({
//   attributes: ["id", "name", "email", "contact"],
//   where: { email: req.body.email },
// });

/* // I might need a findOne for individual post updates on PostRead, something like the following...
   // I don't think I need this anylonger...
exports.userRead = (req, res, next) => {
  // console.log("Works");
  PostRead.findOne({ where: { userId: req.auth.userId, postId: req.params.id } })
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((error) => {
      res.status(400).json({
        error: error.message,
      });
    });
}; */

/* exports.userRead = (req, res, next) => {
  // console.log("Works");
  PostRead.findAll({ attributes: ["postId"], where: { userId: req.auth.userId } })
    .then((post) => {
      res.status(200).json(post.map((x) => x.postId));
    })
    .catch((error) => {
      res.status(400).json({
        error: error.message,
      });
    });
}; */
