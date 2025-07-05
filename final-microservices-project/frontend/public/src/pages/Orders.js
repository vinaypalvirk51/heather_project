import React, { useEffect, useState } from "react";
import axios from "axios";
import ordersImage from "../assets/orders.png"; // ✅ Import the orders image

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:4004/orders")
      .then(res => setOrders(res.data))
      .catch(err => console.error("Error fetching orders", err));
  }, []);

  return (
    <div style={style}>
      <img
        src={ordersImage}
        alt="Orders"
        style={{ width: "100%", borderRadius: 10, marginBottom: 20 }}
      />
      <h2>Orders</h2>
      {orders.map((o, i) => (
        <div key={i} style={card}>
          <p><b>User ID:</b> {o.userId}</p>
          <p><b>Total:</b> ${o.total}</p>
          <p><b>Status:</b> {o.status}</p>
          <ul>
            {o.items.map((item, j) => (
              <li key={j}>Product {item.productId} x {item.quantity}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

const style = { padding: 20 };
const card = {
  border: "1px solid #ccc",
  padding: 10,
  marginBottom: 10
};

export default Orders;
