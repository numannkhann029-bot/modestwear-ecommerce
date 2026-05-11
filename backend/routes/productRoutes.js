const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const adminOnly = require("../middleware/adminMiddleware");
const protect = require("../middleware/authMiddleware");

// ✅ GET all products (PUBLIC)
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
});

// ✅ GET single product (PUBLIC)
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
});

// 🔒 ADD product (ADMIN ONLY) ✅ FIXED
router.post("/", protect, adminOnly, async (req, res) => {
  try {
    console.log("REQ BODY:", req.body); // ✅ DEBUG

    const { name, price, image, description, category } = req.body;

    // ✅ FIXED VALIDATION (category added)
    if (!name || !price || !image || !category) {
      return res.status(400).json({
        message: "All fields including category are required ❌",
      });
    }

    const product = new Product({
      name,
      price,
      image,
      description,
      category, // ✅ MUST
    });

    const createdProduct = await product.save();

    res.status(201).json(createdProduct);
  } catch (error) {
    console.error("ADD PRODUCT ERROR:", error.message);
    res.status(500).json({ message: error.message });
  }
});

// 🔒 DELETE product (ADMIN ONLY)
router.delete("/:id", protect, adminOnly, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await product.deleteOne();

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
});

// 🔒 UPDATE product (ADMIN ONLY) ✅ FIXED
router.put("/:id", protect, adminOnly, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.name = req.body.name || product.name;
    product.price = req.body.price
      ? Number(req.body.price)
      : product.price;
    product.image = req.body.image || product.image;
    product.description = req.body.description || product.description;
    product.category = req.body.category || product.category; // ✅ FIX

    const updatedProduct = await product.save();

    res.json(updatedProduct);
  } catch (error) {
    console.error("UPDATE ERROR:", error.message);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;