const express = require("express");

const router = express.Router();

const userController = require("../controllers/userController");

router.get("/dashboard", userController.dashboard_get);

module.exports = router;
