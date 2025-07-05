const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const Product = require("./db");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get("/products", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

app.post("/products", async (req, res) => {
  const product = new Product(req.body);
  await product.save();
  res.status(201).send("Product created");
});

const PORT = 4003;
app.listen(PORT, () => console.log(`🚀 Product Service running on ${PORT}`));
