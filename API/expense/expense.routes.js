const express = require("express");
const expenseController =  require("./expense.controller");
const router = express.Router();

router.get("/",expenseController.getAllExpenses);
router.get("/:id",expenseController.getSpecificExpenses);
router.post("/",expenseController.addExpenses);
router.delete("/:id",expenseController.deleteExpenses);
router.patch("/:id",expenseController.updateExpenses);

module.exports = router;