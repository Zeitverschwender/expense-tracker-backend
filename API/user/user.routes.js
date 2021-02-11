const express = require("express");
const userController =  require("./user.controller");
const router = express.Router();

router.get("/photo",userController.getGooglePhoto);
router.get("/name", userController.getUsername);

module.exports = router;