const DatabaseHelpers =  require("../../utils/DatabaseHelpers");
const Category = require("../../db/models/category");
const Exception = require('../../utils/Exception');

const getCategory = async (req, res, next) => {
  const catgeoryId = req.params.id;
  try {
    const currUser = await DatabaseHelpers.getUserFromId(req.user);
    const category = currUser.categories.id(catgeoryId);
    res.json(category);
  } catch (e) {
    next(new Exception(400, e.message))
  }
};

const getAllCategories = async (req, res, next) => {
  try {
    const currUser = await DatabaseHelpers.getUserFromId(req.user);
    const categories = await currUser.categories;
    res.json(categories);
  } catch (e) {
    next(new Exception(400, e.message))
  }
};

const addCategory = async (req, res, next) => {
  const category = req.body;
  try {
    const currUser = await DatabaseHelpers.getUserFromId(req.user);
    const newCategory = await new Category(category);
    currUser.categories.push(newCategory);
    res.status(201).json({
      status: "Success",
      message: "Category created successfuly",
      newCategory,
    });
  } catch (e) {
    next(new Exception(400,e.message));
  }
};

const updateCategory = async (req, res, next) => {
  const catgeoryId = req.params.id;
  const updatedCategoryFields = req.body;
  try {
    const currUser = await DatabaseHelpers.getUserFromId(req.user);
    const categoryToUpdate = currUser.categories.id(catgeoryId);
    categoryToUpdate.set(updatedCategoryFields);
    await currUser.save();
    res.json({
      status: "Success",
      message: "Category updated successfuly",
      categoryToUpdate,
    });
  } catch (e) {
    next(new Exception(400, e.message))
  }
};


const deleteCategory = async (req, res, next) => {
  const catgeoryId = req.params.id;
  try {
    const currUser = await DatabaseHelpers.getUserFromId(req.user);
    currUser.categories.id(catgeoryId).remove();
    await currUser.save()
    res.json({
      status: "Success",
      message: "Category deleted successfuly",
    });
  } catch (e) {
    next(new Exception(400, e.message))
  }
};

module.exports = {
  getAllCategories,
  addCategory,
  getCategory,
  updateCategory,
  deleteCategory,
};
