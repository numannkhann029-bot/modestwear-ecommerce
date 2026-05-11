const Product = require("../models/Product");

// DELETE PRODUCT
const deleteProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.deleteOne();
    res.json({ message: "Product deleted" });
  } else {
    res.status(404).json({ message: "Product not found" });
  }
};

module.exports = {
  deleteProduct,
};