const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    image: {
      type: String,
      required: true,
      default: "https://via.placeholder.com/300",
    },

    description: {
      type: String,
      required: true,
    },

    // 🔥 NEW FIELD (IMPORTANT)
    category: {
      type: String,
      required: true,
      enum: ["watches", "men", "women","shoes"], // only these allowed
    },
  },
  {
    timestamps: true, // ✅ adds createdAt & updatedAt
  }
);

module.exports = mongoose.model("Product", productSchema);