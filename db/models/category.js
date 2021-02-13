const mongoose = require("mongoose");

const CategorySchema = mongoose.Schema(
  {
    title: {
      desc: "Category Title",
      type: String,
      required: true,
      trim: true,
      maxLength: 128,
    },
    color: {
      desc: "Color of the category in hex",
      type: String,
      maxLength: 7,
      minLength: 4,
      default: "#f63",
    },
    description: {
      desc: "Category Description",
      type: String,
      trim: true,
      maxLength: 520,
    },
  },
  {
    strict: true,
    versionKey: false,
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);

module.exports = mongoose.model("Category", CategorySchema);
