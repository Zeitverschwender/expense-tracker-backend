const Expense = require("../../db/models/expense");
const Exception = require('../../utils/Exception');

const getAllExpenses = async (req, res, next) => {
  try {
    const allItems = await Expense.find();
    res.json(allItems);
  } catch (e) {
    next(new Exception(400, e.message))
  }
};
const getSpecificExpenses = async (req, res, next) => {
	const expenseId = req.params.id;
  try {
    const currentItem = await Expense.findById(expenseId);
    res.json(currentItem);
  } catch (e) {
    next(new Exception(400, e.message))
  }
};
const addExpenses = async (req, res, next) => {
	const expense = req.body;
  try {
    const newItem = await Expense.create(req.body);
    res.status(201).json({
      status: "Success",
      message: "Expense created successfuly",
      newItem,
    });
  } catch (e) {
    next(new Exception(400, e.message))
  }
};
const updateExpenses = async (req, res, next) => {
	const expenseId = req.params.id;
  try {
    const expenseToUpdate = await Expense.findByIdAndUpdate(
      expenseId,
      req.body,
			{useFindAndModify:false}
    );
    res.json({
      status: "Success",
      message: "Expense updated successfuly"
    });
  } catch (e) {
    next(new Exception(400, e.message))
  }
};
const deleteExpenses = async (req, res, next) => {
	const expenseId = req.params.id;
  try {
    await Expense.deleteOne({ _id: expenseId });
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
