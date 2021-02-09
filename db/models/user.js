const mongoose = require("mongoose");

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
      desc: "",
      type: String,
      default: "",
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
