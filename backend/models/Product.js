import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String },
  ecoScore: { type: Number },
  image: { type: String }
});

const Product = mongoose.model("Product", productSchema);

export default Product;
