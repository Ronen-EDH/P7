const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

const postCtrl = require("../controllers/post");

router.get("/", auth, postCtrl.getAllPosts);
router.post("/", auth, multer, postCtrl.addPost);
router.get("/read/:id", auth, postCtrl.isRead);
router.put("/read/:id", auth, postCtrl.toggleRead);

module.exports = router;
