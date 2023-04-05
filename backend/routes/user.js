const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const userCtrl = require("../controllers/user");

router.post("/signup", userCtrl.signup);
router.post("/signin", userCtrl.signin);
router.delete("/", auth, userCtrl.deleteAcc);
router.get("/", auth, userCtrl.userInfo);

module.exports = router;
