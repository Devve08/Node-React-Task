const express = require("express");
const {
  getAllItems,
  createNewItem,
  getSingleItem,
  updateItem,
  deleteItem,
} = require("../controllers/items");
const multer = require("multer");

const router = express.Router();
const path = require("path");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./images");
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, Date.now() + '--' + file.originalname);
  },
});

const upload = multer({ storage });

router.route("/").get(getAllItems).post(upload.single("file"), createNewItem);
router.route("/:id").get(getSingleItem).patch(upload.single("file"),updateItem).delete(deleteItem);

module.exports = router;
