const mongoose = require("mongoose");

const TokenSchema = mongoose.Schema(
  {
    _id: {
      desc: "Token Value",
      type: String,
      required: true,
      trim: true,
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

module.exports = mongoose.model("Token", TokenSchema);
