const { nextTick } = require("process");
const Category = require("../../db/models/category");

const getAllCategories = async (req, res, next) => {
  try {
    const categories = await Category.find({});
    res.json(categories);
  } catch (e) {
    next(e);
  }
};
const addCategory = async (req, res, next) => {
  const category = req.body;
  try {
    await Category.create(category);
    res.status(201).json({
      status: "Success",
      message: "Category created successfuly",
      category,
    });
  } catch (e) {
    next(e);
  }
};

const getCategory = async (req, res, next) => {
  const catgeoryId = req.params.id;
  try {
    const category = await Category.findById(catgeoryId);
    res.json(category);
  } catch (e) {
    next(e);
  }
};
const deleteCategory = async (req, res, next) => {
  const catgeoryId = req.params.id;
  try {
    await Category.deleteOne({ _id: catgeoryId });
    res.json({
      status: "Success",
      message: "Category deleted successfuly",
    });
  } catch (e) {
    next(e);
  }
};
const editCategory = async (req, res) => {
  const catgeoryId = req.params.id;
  const updatedCategoryFields = req.body;
  try {
    const category = await Category.findByIdAndUpdate(
      catgeoryId,
      updatedCategoryFields
    );
    res.json({
      status: "Success",
      message: "Category updated successfuly",
      category,
    });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getAllCategories,
  addCategory,
  getCategory,
  deleteCategory,
  editCategory,
};
