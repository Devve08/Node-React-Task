const mongoose = require("mongoose");


const categorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Must provide a Category name"],
    trim: true,
    maxlength: [20, 'Name can not be more than 20 characters']
  },
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: "Item" }],
});

module.exports = mongoose.model("Category", categorySchema);
