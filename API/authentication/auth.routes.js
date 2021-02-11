const router = require("express").Router();
const authController = require("./auth.controller");

router.get("/google",  authController.getUserConsent);

router.get("/google/callback", authController.loginUser);

module.exports = router;
