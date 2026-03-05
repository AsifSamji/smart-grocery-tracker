const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },

    quantity: {
      type: Number,
      required: true,
      default: 1,
    },

    unit: {
      type: String,
      enum: ["kg", "liter", "pcs"],
      required: true,
      default: "pcs",
    },

    purchaseDate: {
      type: Date,
      required: true,
    },

    expireDate: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Item", itemSchema);