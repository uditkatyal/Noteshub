const express = require("express");
const router = express.Router();
const userController = require("../controllers/userControllers");

router.route("/").post(userController.registerUser);
router.route("/login").post(userController.authUser);

module.exports = router;
