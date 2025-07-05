const mongoose = require("mongoose");

mongoose.connect("mongodb://order-db:27017/orders", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("✅ Connected to Order DB");
}).catch(err => {
  console.error("❌ Order DB connection error:", err);
});

const orderSchema = new mongoose.Schema({
  userId: String,
  items: [
    {
      productId: String,
      quantity: Number
    }
  ],
  total: Number,
  status: {
    type: String,
    default: "pending"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
