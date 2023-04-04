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
  // console.log("Works");
  // console.log("body:", req.body);
  // if (req.body.id) {
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
  // console.log("file:", req.file);
  // console.log("req.body:", req.body);
  if (req.fileValidationError) {
    return res.status(400).json({ message: req.fileValidationError });
  }
  const data = {
    title: req.body.title,
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

/*   exports.addPost = (req, res, next) => {
    // console.log("file:", req.file);
    // console.log("req.body:", req.body);
    let user, post;
    const url = req.protocol + "://" + req.get("host");
    Post.create({ title: req.body.title, text: req.body.text, img: url + "/assets/" + req.file.filename })
      .then((newPost) => {
        User.findOne({ where: { id: req.auth.userId } }).then((data) => {
          user = data;
          Post.findOne({ where: { id: newPost.id } }).then((data) => {
            post = data;
            user.addPosts(post);
          });
        });
      })
      //     .then((newPost) => {
      //   console.log("newPost:", newPost);
      //   res.status(200).json({
      //     newPost,
      //     // message: "Post created successfully!",
      //   });
      // })
      .catch((error) => {
        res.status(400).json({
          error: error.message,
        });
      });
  }; */
