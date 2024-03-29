const Expense = require("../../db/models/expense");
const DatabaseHelpers =  require("../../utils/DatabaseHelpers");
const Exception = require('../../utils/Exception');

const getAllExpenses = async (req, res, next) => {
  try {
    const currUser = await DatabaseHelpers.getUserFromId(req.user);
    const allUserItems = currUser.expenses;
    res.json(allUserItems);
  } catch (e) {
    next(new Exception(400, e.message))
  }
};
const getSpecificExpenses = async (req, res, next) => {
	const expenseId = req.params.id;
  try {
    const currUser = await DatabaseHelpers.getUserFromId(req.user);
    const currentItem = currUser.epenses.id(expenseId);
    res.json(currentItem);
  } catch (e) {
    next(new Exception(400, e.message))
  }
};
const addExpenses = async (req, res, next) => {
	const expense = req.body;
  try {
    const currUser = await DatabaseHelpers.getUserFromId(req.user);
    if(expense.category && !currUser.categories.id(expense.category)){
      return next(new Exception(400, "Category Id is not valid."))
    }
    const newExpense = await new Expense(expense);
    currUser.expenses.push(newExpense);
    await currUser.save();
    res.status(201).json({
      status: "Success",
      message: "Expense created successfuly",
      newExpense,
    });
  } catch (e) {
    next(new Exception(400, e.message))
  }
};
const updateExpenses = async (req, res, next) => {
	const expenseId = req.params.id;
  const updatedExpenseFields = req.body;
  try {
    const currUser = await DatabaseHelpers.getUserFromId(req.user);
    const itemToUpdate = currUser.expenses.id(expenseId);
    if(updatedExpenseFields.category && !currUser.categories.id(updatedExpenseFields.category)){
      return next(new Exception(400, "Category Id is not valid."))
    }
    itemToUpdate.set(updatedExpenseFields);
    await currUser.save();
    res.json({
      status: "Success",
      message: "Expense updated successfuly",
      itemToUpdate,
    });
  } catch (e) {
    next(new Exception(400, e.message))
  }
};
const deleteExpenses = async (req, res, next) => {
	const expenseId = req.params.id;
  try {
    const currUser = await DatabaseHelpers.getUserFromId(req.user);
    currUser.expenses.id(expenseId).remove();
    await currUser.save()
    res.json({
      status: "Success",
      message: "Expense deleted successfuly",
    });
  } catch (e) {
    next(new Exception(400, e.message))
  }
};
module.exports = {
  getAllExpenses,
  getSpecificExpenses,
  addExpenses,
  updateExpenses,
  deleteExpenses,
};
