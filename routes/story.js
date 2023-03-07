const express = require("express");

const router = express.Router();

const userController = require("../controllers/userController");
const messageController = require("../controllers/messageController");

//* USER Routes *//

router.get("/sign-up", userController.sign_up_get);

router.post("/sign-up", userController.sign_up_post);

router.get("/login", userController.login_get);

router.post("/login", userController.login_post);

router.get("/join-club");

module.exports = router;
