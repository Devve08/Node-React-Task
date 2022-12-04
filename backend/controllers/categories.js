const Category = require("../models/category");
const getAllCategories = async (req, res) => {
  try {
    let data = await Category.find({}).populate("items");
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const createNewCategory = async (req, res) => {
  try {
    const category = await Category.create(req.body);

    res.status(201).json({ category });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const updateCategory = async (req, res) => {
  try {
    let catId = req.params.id;
    let category = await Category.findOneAndUpdate({ _id: catId }, req.body, {
      new: true,
      runValidators: true,
    });
    if (!category) {
      return res.status(404).json({ msg: `No Item found with id: ${catId}` });
    }
    res.status(200).json({ category });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const getSingleCategory = async (req, res) => {
  try {
    let catId = req.params.id;
    let category = await Category.findOne({ _id: catId }).populate("items");
    if (!category) {
      return res.status(404).json({ msg: `No Item found with id: ${catId}` });
    }
    res.status(200).json({ category });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const deleteCategory = async (req, res) => {
  try {
    let catId = req.params.id;
    let category = await Category.findOneAndDelete({ _id: catId });
    if (!category) {
      return res.status(404).json({ msg: `No Item found with id: ${catId}` });
    }
    res.status(200).json({ msg: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

module.exports = {
  getAllCategories,
  createNewCategory,
  updateCategory,
  getSingleCategory,
  deleteCategory,
};
