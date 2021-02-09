const mongoose = require("mongoose");

const ExpenseSchema = mongoose.Schema(
  {
    date: {
      desc: "Date of expense",
      type: Date,
      required: true,
    },
    note: {
      desc: "Item Note",
      type: String,
      trim: true,
      maxLength: 520,
    },
    category: {
      desc: "Category Interval",
      type: Category.schema,
      required: true,
    },
    amount: {
      desc: "Amount of money spent",
      type: Number,
      required: true,
    },
    paymentType: {
      desc: "",
      type: String,
      enum: ["Cash", "Credit Card"],
      required: true,
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

module.exports = mongoose.model("Expense", ExpenseSchema);
