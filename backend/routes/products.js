import express from "express";
import Product from "../models/Product.js";

const router = express.Router();


// Get all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    console.error(" Error fetching products:", err.message);
    // Always return an array, even on error
    res.status(500).json([]);
  }
});


// Add a new product
router.post("/", async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
