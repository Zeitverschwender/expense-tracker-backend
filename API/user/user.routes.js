const express = require("express");
const userController =  require("./user.controller");
const router = express.Router();

router.get("/photo",userController.getAllExpenses);
router.get("/name",userController.getSpecificExpenses);

module.exports = router;