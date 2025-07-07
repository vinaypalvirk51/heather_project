const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const Product = require("./db");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Serve uploaded images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${Math.random().toString(36).substr(2, 9)}${ext}`);
  },
});
const upload = multer({ storage });

// POST /products - create product
app.post("/products", upload.single("image"), async (req, res) => {
  try {
    const { sku, name, price, categories, instock, description } = req.body;

    const image = req.file ? req.file.filename : null;


    const product = new Product({
      sku,
      name,
      price,
      categories: categories?.split(",").map(c => c.trim()) || [],
      instock,
      description,
      image,
    });

    await product.save();
    res.status(201).json(product); // return product so frontend can use it if needed
  } catch (err) {
    console.error("❌ Error saving product:", err.message);
    res.status(500).send("Failed to create product");
  }
});

// GET /products - get all products
app.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    console.error("❌ Error fetching products:", err.message);
    res.status(500).send("Failed to fetch products");
  }
});

const PORT = 4003;
app.listen(PORT, () => console.log(`🚀 Product Service running on port ${PORT}`));
