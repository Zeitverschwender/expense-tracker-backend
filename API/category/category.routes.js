const router = require("express").Router();
const categoryController = require("./category.controller");

router.get("/", categoryController.getAllCategories);
router.post("/", categoryController.addCategory);
router.get("/:id", categoryController.getCategory);
router.delete("/:id", categoryController.deleteCategory);
router.patch("/:id", categoryController.editCategory);

module.exports = router;