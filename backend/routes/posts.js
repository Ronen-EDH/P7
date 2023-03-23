const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

const postCtrl = require("../controllers/post");

router.get("/", auth, postCtrl.getAllPosts);
router.post("/", auth, multer, postCtrl.addPost);
router.get("/read/", auth, postCtrl.userRead);
// router.get("/read/:id", auth, postCtrl.userRead);
router.get("/:id", auth, postCtrl.getSinglePost);

// router.put("/:id", auth, multer, postCtrl.modifypost);
// router.delete("/:id", auth, postCtrl.deletepost);

module.exports = router;
