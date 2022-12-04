const mongoose = require("mongoose");


const itemSchema = mongoose.Schema({
  image: String,
  price: Number,
  description: String,
  title: { type: String, required: true },
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category"},
});

module.exports = mongoose.model("Item", itemSchema);
