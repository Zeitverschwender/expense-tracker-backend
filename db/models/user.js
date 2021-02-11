const mongoose = require("mongoose");
const Expense = require("./expense");

const UserSchema = mongoose.Schema(
  {
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
