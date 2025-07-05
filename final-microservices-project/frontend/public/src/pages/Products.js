import React, { useEffect, useState } from "react";
import axios from "axios";
import productsImage from "../assets/products.png"; // ✅ Import the product image

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:4003/products")
      .then(res => setProducts(res.data))
      .catch(err => console.error("Error fetching products", err));
  }, []);

  return (
    <div style={style}>
      <img
        src={productsImage}
        alt="Products"
        style={{ width: "100%", borderRadius: 10, marginBottom: 20 }}
      />
      <h2>Products</h2>
      {products.map((p, i) => (
        <div key={i} style={card}>
          <h3>{p.name}</h3>
          <p>{p.description}</p>
          <p><b>Price:</b> ${p.price}</p>
        </div>
      ))}
    </div>
  );
};

const style = { padding: 20 };
const card = {
  border: "1px solid #ddd",
  padding: 10,
  marginBottom: 10,
  borderRadius: 5
};

export default Products;
