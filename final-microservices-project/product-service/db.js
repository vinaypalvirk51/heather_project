const mongoose = require("mongoose");

mongoose.connect("mongodb://product-db:27017/products", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("✅ Connected to Product DB");
}).catch(err => {
  console.error("❌ Product DB connection error:", err);
});

const productSchema = new mongoose.Schema({
  sku: String,
  name: String,
  price: Number,
  description: String,
  categories: [String],
  instock: Number
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
