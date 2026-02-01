const express = require("express");
const AuthController = require("../Controller/AuthController");
const router = express.Router();

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);

module.exports = router;
