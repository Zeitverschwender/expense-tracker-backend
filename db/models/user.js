const mongoose = require("mongoose");
const Expense = require("./expense");
const Category = require("./category");
const defaultCategories =  require("../defaultCategories.json");

const UserSchema = mongoose.Schema(
  {
    googleId: {
      type: String,
      required: true,
    },
    name: {
      desc: "user full name",
      type: String,
      required: true,
      trim: true,
      maxLength: 128,
    },
    profile_picture_url: {
      desc: "User's Google Picture",
      type: String,
      default: "",
    },
    expenses: {
      desc: "User Expenses",
      type: [Expense.schema],
    },
    categories: {
      desc: "User Categories",
      type: [Category.schema],
      default: defaultCategories.defaultCategories,
    }
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

module.exports = mongoose.model("User", UserSchema);
