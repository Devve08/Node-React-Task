const Item = require("../models/item");
const Category = require("../models/category");

const getAllItems = async (req, res) => {
  const items = await Item.find().populate("categoryId");
  res.status(201).json(items);
};

const createNewItem = async (req, res) => {
  try {
    const host = req.hostname;
    let filePath;
    if (req.file) {
      filePath =
        req.protocol +
        "://" +
        "localhost:8000" +
        "/" +
        req.file.path.replace(/\\/g, "/");
    }

    let itemData = {
      title: req.body.title,
      description: req.body.description,
      image: filePath ? filePath : "",
      price: req.body.price,
      categoryId: req.body.categoryId,
    };

    const item = await Item.create(itemData);
    if (req.body.categoryId) {
      let catId = req.body.categoryId;
      let catInfo = await Category.findOne({ _id: catId });

      let bodyData = {
        items: [...catInfo.items, item.id],
      };
      let result = await Category.findOneAndUpdate({ _id: catId }, bodyData);
      if (result) {
        return res.status(201).json({ msg: "Item created successfully" });
      }
    }
    res.status(201).json({ msg: "Item created successfully" });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const updateItem = async (req, res) => {
  try {
    let itemId = req.params.id;
    let filePath;
    if (req.file) {
      filePath =
        req.protocol +
        "://" +
        "localhost:8000" +
        "/" +
        req.file.path.replace(/\\/g, "/");
    }
    let itemData = {
      title: req.body.title,
      description: req.body.description,
      image: filePath ? filePath : req.body.image,
      price: req.body.price ? req.body.price : 0,
      categoryId: req.body.categoryId,
    };
    let item = await Item.findOneAndUpdate({ _id: itemId }, itemData);

    let oldCategoryId = item?.categoryId?.toString();
    //update items arrays in both categories
    if (oldCategoryId !== itemData?.categoryId) {
      let oldCat = await Category.findOne({ _id: oldCategoryId });
      let newCat = await Category.findOne({ _id: itemData?.categoryId });
      let newCatData = {
        items: [...newCat.items, item.id],
      };

      let oldItemsArray = oldCat?.items?.filter(
        id => id?.toString() !== itemId
      );

      let oldCatData = {
        items: oldItemsArray,
      };

      //update items array in the new caegory
      let resultOfNewCat = await Category.findOneAndUpdate(
        { _id: itemData?.categoryId },
        newCatData
      );

      //update items array in the old category
      let resultOfOldCat = await Category.findOneAndUpdate(
        { _id: oldCategoryId },
        oldCatData
      );
    }

    if (!item) {
      return res.status(404).json({ msg: `No Item found with id: ${itemId}` });
    }
    res.status(200).json({ item });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const getSingleItem = async (req, res) => {
  try {
    let itemId = req.params.id;
    let item = await Item.findOne({ _id: itemId }).populate("categoryId");
    if (!item) {
      return res.status(404).json({ msg: `No Item found with id: ${itemId}` });
    }
    res.status(200).send({ item });
  } catch (error) {
    res.status(500).send({ msg: error });
  }
};

const deleteItem = async (req, res) => {
  let itemId = req.params.id;
  const item = await Item.findOne({ _id: itemId }).populate("categoryId");

  //getting the category ID
  const categoryId = item?.categoryId?._id;
  const category = await Category.findOne({ _id: categoryId }).populate(
    "items"
  );
  if (category?.items?.length > 0) {
    //removing the requested item ID from the items array in Category
    let itemsArrayInCategory = category?.items?.filter(
      el => el?._id?.toString() !== itemId
    );

    //update the items array in targeted category
    let updatedData = {
      items: itemsArrayInCategory,
    };
    const updateCategory = await Category.findOneAndUpdate(
      { _id: categoryId },
      updatedData
    );
  }
  //deleting the requested item
  const result = await Item.findOneAndDelete({ _id: itemId });
  if (!item) {
    return res.status(404).json({ msg: `No Item found with id: ${itemId}` });
  }

  res.status(200).send({ msg: "Item deleted successfully" });
};

module.exports = {
  createNewItem,
  updateItem,
  getAllItems,
  getSingleItem,
  deleteItem,
};
