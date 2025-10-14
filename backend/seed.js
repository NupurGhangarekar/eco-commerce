import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/Product.js";

dotenv.config();

const products = [
  { name: "Bamboo Bottle", price: 799, category: "Kitchen", ecoScore: 90, image: "https://images.unsplash.com/photo-1596464716121-8b88c8052a84" },
  { name: "Jute Bag", price: 299, category: "Home", ecoScore: 92, image: "https://images.unsplash.com/photo-1556761175-b413da4baf72" },
  { name: "Recycled Glass Vase", price: 649, category: "Decor", ecoScore: 88, image: "https://images.unsplash.com/photo-1504198266285-165a2f93651e" }
];

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("🌱 Seeding database...");
    await Product.deleteMany({});
    await Product.insertMany(products);
    const count = await Product.countDocuments();
    console.log(`✅ Products seeded. Total in DB: ${count}`);
    mongoose.disconnect();
  })
  .catch(err => console.error("❌ Seeding error:", err));
