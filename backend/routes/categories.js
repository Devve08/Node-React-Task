const express = require("express");
const {
  getAllCategories,
  createNewCategory,
  getSingleCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categories");
const router = express.Router();


router.route("/").get(getAllCategories).post(createNewCategory);
router.route("/:id").get(getSingleCategory).patch(updateCategory).delete(deleteCategory);


module.exports = router;
