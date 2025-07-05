const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const Order = require("./db");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get("/orders", async (req, res) => {
  const orders = await Order.find();
  res.json(orders);
});

app.post("/orders", async (req, res) => {
  const order = new Order(req.body);
  await order.save();
  res.status(201).send("Order created");
});

const PORT = 4004;
app.listen(PORT, () => console.log(`🚀 Order Service running on ${PORT}`));
