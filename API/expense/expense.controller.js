const Expense = require("../../db/models/expense");

const getAllExpenses = async (req, res, next) => {
    try{
        const allItems = await Expense.find();
        res.json(allItems);
    }
    catch (e){
        return next(e)
    }
}
const getSpecificExpenses = async (req, res, next) => {
	try{
			const currentItem = await Expense.findById(req.params.id);
			res.json(currentItem);
	}
	catch (e){
			return next(e)
	}
}
const addExpenses = async (req, res, next) => {
	try{
    const newItem = new Expense(req.body);
    await newItem.save();
    res.status(201).json({
			status: "Success",
			message: "Expense created successfuly",
			newItem
		});
	}
	catch (e){
		return next(e)
	}
}
const updateExpenses = async (req, res, next) => {
	try{
    const updatedExpense = await Expense.findByIdAndUpdate(req.params.id, req.body,);
    res.json({
      status: "Success",
      message: "Expense updated successfuly",
			updatedExpense
    });
	}
	catch (e){
		return next(e);
	}
}
const deleteExpenses = async (req, res, next) => {
	try{
		await Expense.remove({_id: req.params.id});
		res.json({
      status: "Success",
      message: "Expense deleted successfuly",
    });
	}
	catch (e) {
		return next(e);
	}
}
module.exports = {
  getAllExpenses,
	getSpecificExpenses,
	addExpenses,
	updateExpenses,
	deleteExpenses
}