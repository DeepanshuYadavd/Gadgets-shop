const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
  image: {
    type: String,
    default: "images/tablets-category.png",
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    default: "deafult category description",
  },
  attrs: [
    {
      key: {
        type: String,
      },
      value: [
        {
          type: String,
        },
      ],
    },
  ],
});
categorySchema.index({ description: 1 });

const Category = mongoose.model("Category", categorySchema);
module.exports = Category;
