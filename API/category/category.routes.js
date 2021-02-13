const router = require("express").Router();
const categoryController = require("./category.controller");

router.get("/", categoryController.getAllCategories);
router.post("/", categoryController.addCategory);
router.get("/:id", categoryController.getCategory);
router.patch("/:id", categoryController.updateCategory);
router.delete("/:id", categoryController.deleteCategory);

module.exports = router;